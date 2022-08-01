import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@context/Auth";
import Sidebar from "@components/Sidebar";

const Home: FC = () => {
    const { session, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <div className="default-style flex flex-row justify-center">
            <Sidebar />
            <div className="w-[990px]">
                <div className="w-[600px] border-x p-3 light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
                    <Link href="/theme" passHref>
                        <button className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1">
                            Theme Page
                        </button>
                    </Link>
                    <button
                        className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1"
                        onClick={() => signOut()}
                    >
                        Sign Out
                    </button>
                    <div className="h-[2000px] w-10 bg-transparent"></div>
                </div>
                <div className="ml-7 w-[350px]"></div>
            </div>
        </div>
    );
};

export default Home;
