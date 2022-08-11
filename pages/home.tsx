import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@context/Auth";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import Image from "next/image";

const Home: FC = () => {
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <div className="default-style flex flex-row justify-center">
            <Sidebar />
            <div className="w-full max-w-[990px]">
                <div className="min-h-screen w-full max-w-[600px] border-x light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
                    <Header type="home" />
                    <div className="m-8">
                        <Image
                            src="https://pbs.twimg.com/media/FZlhImJWIAAG5CK?format=jpg"
                            alt="Test"
                            width={700}
                            height={700}
                        />
                    </div>
                    <div className="h-[2000px] w-10 bg-transparent"></div>
                </div>
                <div className="ml-7 w-full max-w-[350px]"></div>
            </div>
        </div>
    );
};

export default Home;
