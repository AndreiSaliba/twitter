import { FC, Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@context/Auth";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";

const Home: FC = () => {
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <div className="default-style flex flex-row sm:justify-center">
            <Sidebar />
            <Suspense>
                <div className="w-full max-w-[990px]">
                    <div className="min-h-screen w-full max-w-[600px] border-x light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
                        <Header variant="home" />
                        <div className="h-[2000px] w-10 bg-transparent"></div>
                    </div>
                    <div className="ml-7 w-full max-w-[350px]"></div>
                </div>
            </Suspense>
        </div>
    );
};

export default Home;
