import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import type {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {
    return (
        <div className="w-screen">
            <NavBar />
            <div className="mx-3 lg:max-w-[800px] flex justify-center lg:mx-auto my-5 ">
                <Component {...pageProps} />
            </div>
        </div>
    );
}
