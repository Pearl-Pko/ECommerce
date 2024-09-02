import Link from "next/link";
import React from "react";

export default function NavBar() {
    return (
        <div className=" flex p-3 border-b-2 justify-center w-screen mx-auto">
            <div className="max-w-[800px]  flex flex-row justify-between items-center w-full">
                <Link href="/" className="text-lg">ECommerce Store</Link>
                <Link href="/products/add" className="bg-blue-400 text-white px-4 py-2 rounded-full">
                    Add product
                </Link>
            </div>
        </div>
    );
}
