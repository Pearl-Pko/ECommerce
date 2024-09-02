// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import {createProductSchema, ProductSchema} from "@/schema/Product";
import {productsData} from "@/data/data";
import { getRandomInt } from "@/utils/util";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductSchema[] | ProductSchema | {} >
) {
    switch (req.method) {
        case "GET": {
            return res.status(200).json(productsData);
        }
        case "POST": {
            const result = createProductSchema.safeParse(req.body);
            
            if (!result.success)
                return res.status(400).json({ errors: result.error.errors });
            
            const product = {...result.data, id: getRandomInt()}
            productsData.push(product);
            return res.status(200).json(product);
        }
    }
}
