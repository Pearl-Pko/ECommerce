import {
    CreateProductSchema,
    createProductSchema,
    ProductSchema,
} from "@/schema/Product";
import instance from "@/utils/instance";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/router";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IoMdCreate} from "react-icons/io";

export default function Page() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateProductSchema>({
        resolver: zodResolver(createProductSchema),
    });

    const onSubmit: SubmitHandler<CreateProductSchema> = async (product) => {
        console.log("product", product);
        try {
            const data: ProductSchema = (await instance.post(`/api/products`, product)).data;
            router.push(`/products/${data.id}`);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="w-full px-5">
            <p className="text-xl mb-3">Add Product</p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-2 p-6 rounded-md"
            >
                <div className="flex flex-col lg:flex-row w-full gap-4 items-start">
                    {/* <Image
                      src={data.url}
                      alt={data.name}
                      width={300}
                      height={200}
                      className="self-center lg:self-auto"
                      layout="intrinsic"
                  /> */}
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-600" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                className="border-2 w-full px-2 py-1 rounded-md"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="bg-red-400 px-2 py-1 text-white text-sm rounded-md">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-gray-600" htmlFor="url">
                                Image Link
                            </label>
                            <input
                                id="url"
                                className="border-2 w-full px-2 py-1 rounded-md"
                                {...register("url")}
                            />
                            {errors.url && (
                                <p className="bg-red-400 px-2 py-1 text-white text-sm rounded-md">
                                    {errors.url?.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-gray-600" htmlFor="price">
                                Price
                            </label>
                            <input
                                id="price"
                                className="border-2 w-full px-2 py-1 rounded-md"
                                {...register("price")}
                            />
                            {errors.price && (
                                <p className="bg-red-400 px-2 py-1 text-white text-sm rounded-md">
                                    {errors.price?.message}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label
                                className="text-gray-600"
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                className="border-2 w-full px-2 py-1 rounded-md h-32 resize-none"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="bg-red-400 px-2 py-1 text-white text-sm rounded-md">
                                    {errors.description?.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end mt-5">
                    <button
                        type="submit"
                        className="bg-blue-400 text-white px-5 py-2 rounded-full"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
