// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import { ProductSchema } from "@/schema/Product";
import { productsData } from "@/data/data";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductSchema[]>
) {
    res.status(200).json(productsData);
}

