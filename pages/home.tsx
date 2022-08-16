import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@context/Auth";
import { NextPageWithLayout } from "@pages/_app";
import Header from "@components/Header";
import HomeLayout from "@layouts/HomeLayout";

const Home: NextPageWithLayout = () => {
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <>
            <Header variant="home" />
            <div className="h-[2000px] w-10 bg-transparent"></div>
        </>
    );
};

Home.getLayout = (page: ReactElement) => <HomeLayout>{page}</HomeLayout>;

export default Home;
