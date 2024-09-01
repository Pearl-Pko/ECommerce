import {create} from "domain";
import {z} from "zod";

export const productSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Name is required"),
    url: z.string().url(),
    price: z.coerce.number({invalid_type_error: "Price must be number"}),
    description: z.string().min(1, "Description is required"),
});

export const updateProductSchema = productSchema.pick({
    name: true,
    price: true,
    description: true,
});

export type ProductSchema = z.infer<typeof productSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
