import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@context/Auth";
import { TweetType } from "@utils/types";
import DB from "@utils/Database";
import Tweet from "@components/Tweet";
import Header from "@components/Header";
import HomeLayout from "@layouts/HomeLayout";
import ComposeTweet from "@components/ComposeTweet";

const Home = () => {
    const [tweets, setTweets] = useState<TweetType[]>();
    const { session, currentUser, refreshCurrentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    useEffect(() => {
        currentUser &&
            DB.getTweets(currentUser?.userid).then((data) => setTweets(data));
    }, [currentUser]);

    useEffect(() => {
        refreshCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createTweet = (authorID: string, tweetText: string) => {
        DB.createTweet(authorID, tweetText).then(
            () =>
                currentUser &&
                DB.getTweets(currentUser?.userid).then((data) =>
                    setTweets(data)
                )
        );
    };

    const follow = (userID: string) => {
        DB.followUser(userID, currentUser?.userid);
        setTweets((prevState) => {
            let temp = prevState;
            temp &&
                temp.forEach((tweet) => {
                    if (tweet.tweet.author_id === userID)
                        tweet.user.followsAuthor = true;
                });
            return temp;
        });
    };
    const unfollow = (userID: string) => {
        DB.unfollowUser(userID, currentUser?.userid);
        setTweets((prevState) => {
            let temp = prevState;
            temp &&
                temp.forEach((tweet) => {
                    if (tweet.tweet.author_id === userID)
                        tweet.user.followsAuthor = false;
                });
            return temp;
        });
    };

    const deleteTweet = (tweetID: string) => {
        DB.deleteTweet(tweetID).then(() => {
            let temp = [...tweets];
            temp = temp.filter((tweet) => tweet.tweet.tweet_id != tweetID);
            setTweets(temp);
        });
    };

    const addBookark = (userID: string, tweetID: string) => {
        DB.addBookmark(userID, tweetID).then(() => {
            setTweets((prevState) => {
                let temp = prevState;
                const index = temp.findIndex(
                    (tweet) => tweet.tweet.tweet_id == tweetID
                );
                temp[index].user.bookmarkedTweet = true;
                return temp;
            });
            toast(
                <div>
                    <span>Tweet added to your bookmarks </span>
                    <Link href={"/bookmarks"} className="">
                        <a className="ml-4 font-medium hover:underline">View</a>
                    </Link>
                </div>
            );
        });
    };

    const removeBookmark = (userID: string, tweetID: string) => {
        DB.removeBookmark(userID, tweetID).then(() => {
            setTweets((prevState) => {
                let temp = prevState;
                const index = temp.findIndex(
                    (tweet) => tweet.tweet.tweet_id == tweetID
                );
                temp[index].user.bookmarkedTweet = false;
                return temp;
            });
            toast("Tweet removed from your bookmarks");
        });
    };

    return (
        <>
            <Header variant="home" />
            <div className="min-h-[1800px] w-full bg-transparent">
                <ComposeTweet createTweet={createTweet} />
                {tweets?.map((tweet, index) => (
                    <Tweet
                        key={index}
                        page="Home"
                        data={tweet}
                        follow={follow}
                        unfollow={unfollow}
                        deleteTweet={deleteTweet}
                        addBookmark={addBookark}
                        removeBookmark={removeBookmark}
                    />
                ))}
            </div>
        </>
    );
};

Home.PageLayout = HomeLayout;

export default Home;
