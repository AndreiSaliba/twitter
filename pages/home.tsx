import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@context/Auth";
import Header from "@components/Header";
import HomeLayout from "@layouts/HomeLayout";
import ComposeTweet from "@components/ComposeTweet";
import Tweet from "@components/Tweet";
import { useTweets } from "@context/Tweets";

const Home = () => {
    const { session } = useAuth();
    const { tweets } = useTweets();

    const router = useRouter();
    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <>
            <Header variant="home" />
            <div className="min-h-[1800px] w-full bg-transparent">
                <ComposeTweet />
                {tweets &&
                    tweets.map((tweet, index) => (
                        <Tweet key={index} data={tweet} />
                    ))}
            </div>
        </>
    );
};

Home.PageLayout = HomeLayout;

export default Home;
