import {ProductSchema} from "@/schema/Product";
import instance from "@/utils/instance";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import {MdDeleteOutline} from "react-icons/md";
import {IoMdCreate} from "react-icons/io";
import Modal from "@/components/Modal";
import {useRouter} from "next/router";

export const getServerSideProps = (async (context) => {
    const {id} = context.query;

    const data: ProductSchema = (await instance.get(`/api/products/${id}`))
        .data;
    return {props: {data}};
}) satisfies GetServerSideProps<{data: ProductSchema}>;

export default function Page({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const router = useRouter();

    const deletePost = async () => {
        await instance.delete(`/api/products/${data.id}`);
        router.push("/");
    };

    return (
        <div className="w-full">
            <div className="relative w-full flex flex-col lg:flex-row gap-4 border-2 p-6 rounded-md items-start">
                <Image
                    src={data.url}
                    alt={data.name}
                    width={300}
                    className="self-center md:self-auto"
                    height={200}
                    layout="intrinsic"
                />
                <div className="relative flex flex-col gap-2 w-full">
                    <div className="absolute right-0 flex gap-2 ">
                        <Link href={`/products/${data.id}/edit`}>
                            <IoMdCreate
                                size={40}
                                color="grey"
                                className="border-2 p-2 rounded-full border-gray"
                            />
                        </Link>
                        <MdDeleteOutline
                            onClick={() => setModalOpen(true)}
                            size={40}
                            color="red"
                            className="border-2 p-2 border-red-500 rounded-full border-gray"
                        />
                    </div>
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
            <Modal open={modalOpen}>
                <div className="p-8 m-10 max-w-[500px] rounded-lg bg-white h-[150px] flex flex-col justify-between">
                    <p>Are you sure you want to delete this product</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setModalOpen(false)}>Cancel</button>
                        <button
                            onClick={() => deletePost()}
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
