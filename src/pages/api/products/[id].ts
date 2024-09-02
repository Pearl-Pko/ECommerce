import type {NextApiRequest, NextApiResponse} from "next";
import {ProductSchema, UpdateProductSchema} from "@/schema/Product";
import {productsData} from "@/data/data";
import {MdDeleteOutline} from "react-icons/md";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductSchema | {message: string}>
) {
    const {id} = req.query;
    if (!(typeof id == "string")) return;

    switch (req.method) {
        case "GET": {
            const product = productsData.find((p) => p.id === +id);

            if (product) {
                return res.status(200).json(product);
            } else {
                return res.status(404).json({message: "Product not found"});
            }
        }
        case "PUT": {
            const {name, price, description} = req.body as UpdateProductSchema;

            const productIndex = productsData.findIndex((p) => p.id === +id);

            if (productIndex >= 0) {
                const newProduct = {
                    ...productsData[productIndex],
                    ...{name, price, description},
                };
                productsData[productIndex] = newProduct;
                return res.status(200).json(newProduct);
            } else {
                return res.status(404).json({message: "Product not found"});
            }
        }
        case "DELETE": {
            const productIndex = productsData.findIndex((p) => p.id === +id);
            if (productIndex >= 0) {
                productsData.splice(productIndex, 1);
                return res.status(204).json({message: "Successfully deleted"});
            } else {
                return res.status(404).json({message: "Product not found"});
            }
        }
    }
}
