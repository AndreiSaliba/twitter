import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import { useAuth } from "@context/Auth";
import { useRouter } from "next/router";
import { FC, Suspense, useEffect } from "react";

const Notifications: FC = () => {
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <div className="default-style flex flex-row sm:justify-center">
            <Sidebar />
            <div className="w-[990px]">
                <Suspense>
                    <div className="min-h-screen w-[600px] border-x light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
                        <Header variant="notifications" />
                    </div>
                    <div className="ml-7 w-[350px]"></div>
                </Suspense>
            </div>
        </div>
    );
};

export default Notifications;
