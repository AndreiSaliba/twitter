import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@context/Auth";
import Header from "@components/Header";
import HomeLayout from "@layouts/HomeLayout";
import ComposeTweet from "@components/ComposeTweet";

const Home = () => {
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <>
            <Header variant="home" />
            <div className="h-[2000px] w-full bg-transparent">
                <ComposeTweet />
            </div>
        </>
    );
};

Home.PageLayout = HomeLayout;

export default Home;
