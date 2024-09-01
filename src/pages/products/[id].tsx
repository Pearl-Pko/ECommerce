import { ProductSchema } from "@/schema/Product";
import instance from "@/utils/instance";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {IoMdCreate} from "react-icons/io";

export const getServerSideProps = (async (context) => {
    const {id} = context.query;

    const data: ProductSchema = (await instance.get(`/api/products/${id}`)).data;
    console.log("data", data);
    return {props: {data}};
}) satisfies GetServerSideProps<{data: ProductSchema}>;

export default function Page({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="grid place-content-center w-screen">
            <div className="max-w-[800px]">
                <div className="relative flex flex-col lg:flex-row gap-4 border-2 p-6 rounded-md items-start m-5">
                    <Image
                        src={data.url}
                        alt={data.name}
                        width={300}
                        className="self-center md:self-auto"
                        height={200}
                        layout="intrinsic"
                    />
                    <div className="relative flex flex-col gap-2">
                        <Link href={`/products/${data.id}/edit`}> 
                        <IoMdCreate
                            size={40}
                            color="grey"
                            className="absolute right-0 border-2 p-2 rounded-full border-gray"
                        />
                        </Link>
                        <div>
                            <p className="text-gray-600">Name</p>
                            <p>{data.name}</p>
                        </div>

                        <div>
                            <p className="text-gray-600">Price</p>
                            <p>{data.price}</p>
                        </div>

                        <div>
                            <p className="text-gray-600">Description</p>
                            <p>{data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
