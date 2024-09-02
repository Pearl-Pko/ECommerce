import {ProductSchema} from "@/schema/Product";
import instance from "@/utils/instance";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const getServerSideProps = (async () => {
    const data: ProductSchema[] = (await instance.get("/api/products")).data;
    // Pass data to the page via props
    return {props: {data}};
}) satisfies GetServerSideProps<{data: ProductSchema[]}>;

export default function Page({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="">
            <h3 className="text-2xl mb-3">Popular Products</h3>
            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3 lg:gap-7">
                {data.map((item, index) => {
                    return (
                        <Link key={index} href={`/products/${item.id}`}>
                            <div className="flex flex-col gap-2 border-2 p-3 rounded-md">
                                <Image
                                    src={item.url}
                                    alt={item.name}
                                    width={300}
                                    height={200}
                                />
                                <div>
                                    <p>{item.name}</p>
                                    <p className="font-semibold">{`$${item.price}`}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
