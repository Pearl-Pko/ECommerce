import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import React from "react";


export const getServerSideProps = (async () => {
    // Fetch data from external API
    const res = await fetch("api/");
    const data: Product = await res.json();
    // Pass data to the page via props
    return {props: {data}};
}) satisfies GetServerSideProps<{data: Product}>;

export default function Page({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log("data", data);
    return <div>ProductList</div>;
}
