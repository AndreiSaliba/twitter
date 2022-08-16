import { ReactElement, useEffect } from "react";
import Header from "@components/Header";
import { useAuth } from "@context/Auth";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "@pages/_app";
import HomeLayout from "@layouts/HomeLayout";

const Notifications: NextPageWithLayout = () => {
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <>
            <div className="min-h-screen w-[600px] border-x light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
                <Header variant="notifications" />
            </div>
            <div className="ml-7 w-[350px]"></div>
        </>
    );
};

Notifications.getLayout = (page: ReactElement) => (
    <HomeLayout>{page}</HomeLayout>
);

export default Notifications;
