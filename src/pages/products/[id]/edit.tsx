import {
    productSchema,
    ProductSchema,
    UpdateProductSchema,
    updateProductSchema,
} from "@/schema/Product";
import instance from "@/utils/instance";
import {zodResolver} from "@hookform/resolvers/zod";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import Image from "next/image";
import {useRouter} from "next/router";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {IoMdCreate} from "react-icons/io";

export const getServerSideProps = (async (context) => {
    const {id} = context.query;

    const data: ProductSchema = (await instance.get(`/api/products/${id}`))
        .data;
    console.log("data", data);
    // Pass data to the page via props
    return {props: {data}};
}) satisfies GetServerSideProps<{data: ProductSchema}>;

export default function Page({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<ProductSchema>({
        defaultValues: data,
        resolver: zodResolver(updateProductSchema),
    });

    const onSubmit: SubmitHandler<ProductSchema> = async (product) => {
        console.log("product", product)
        try {
            await instance.put(`/api/products/${data.id}`, product);
            router.push(`/products/${data.id}`);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    console.log(data);

    return (
        <div className="grid place-content-center w-screen">
            <div className="w-screen max-w-[800px] p-4">
                <p className="text-xl mb-3">Edit Product</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="border-2 p-6 rounded-md"
                >
                    <div className="flex flex-col lg:flex-row w-full gap-4 items-start">
                        <Image
                            src={data.url}
                            alt={data.name}
                            width={300}
                            height={200}
                            className="self-center lg:self-auto"
                            layout="intrinsic"
                        />
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
                                {errors.name && <p className="bg-red-400 px-2 py-1 text-white text-sm rounded-md">{errors.name?.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label
                                    className="text-gray-600"
                                    htmlFor="price"
                                >
                                    Price
                                </label>
                                <input
                                    id="price"
                                    className="border-2 w-full px-2 py-1 rounded-md"
                                    {...register("price")}
                                />
                                {errors.price && <p className="bg-red-400 px-2 py-1 text-white text-sm rounded-md">{errors.price?.message}</p>}
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
                                    <p className="bg-red-400 px-2 py-1 text-white text-sm rounded-md">{errors.description?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-5">
                        <button
                            type="submit"
                            className="bg-blue-400 text-white px-5 py-2 rounded-full"
                        >
                            Edit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
