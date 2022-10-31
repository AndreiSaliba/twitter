import {
    addBookmark,
    create_tweet,
    getTweets,
    removeBookmark,
} from "@utils/Database";
import { supabase } from "@utils/supabaseClient";
import { TweetType } from "@utils/types";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./Auth";

const TweetsContext = createContext(null);

export const useTweets = () => useContext(TweetsContext);

export const TweetsProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [tweets, setTweets] = useState<TweetType[]>();

    const createTweet = (authorID: string, text: string) => {
        create_tweet(authorID, text).then(() => refreshTweets());
    };

    const deleteTweet = async (tweetID: string) => {
        console.info("Delete Tweet: " + tweetID);
        await supabase
            .from("tweets")
            .delete()
            .eq("tweet_id", tweetID)
            .then(() => {
                const temp = [...tweets];
                const tweetIndex = temp.findIndex(
                    (tweet) => tweet.tweet.tweet_id == tweetID
                );
                tweetIndex != -1 && temp.splice(tweetIndex, 1);
                setTweets(temp);
            });
        return;
    };

    const createBookmark = (userID: string, tweetID: string) => {
        addBookmark(userID, tweetID).then(() => {
            toast(
                <div>
                    <span>Tweet added to your bookmarks </span>
                    <Link href={"/bookmarks"} className="">
                        <a className="ml-4 font-medium hover:underline">View</a>
                    </Link>
                </div>
            );
            const temp = [...tweets];
            const tweetIndex = temp.findIndex(
                (item) => item.tweet.tweet_id == tweetID
            );
            temp[tweetIndex].user.bookmarkedTweet = true;
            setTweets(temp);
        });
    };

    const deleteBookmark = (userID: string, tweetID: string) => {
        removeBookmark(userID, tweetID).then(() => {
            const temp = [...tweets];
            const tweetIndex = temp.findIndex(
                (tweet) => tweet.tweet.tweet_id == tweetID
            );
            temp[tweetIndex].user.bookmarkedTweet = false;
            setTweets(temp);
            toast("Tweet removed from your bookmarks");
        });
    };

    const refreshTweets = () =>
        currentUser &&
        getTweets(currentUser?.userid).then((data) => setTweets(data));

    useEffect(() => {
        currentUser &&
            getTweets(currentUser?.userid).then((data) => setTweets(data));
    }, [currentUser]);

    return (
        <TweetsContext.Provider
            value={{
                tweets,
                createTweet,
                deleteTweet,
                createBookmark,
                deleteBookmark,
                refreshTweets,
            }}
        >
            {children}
        </TweetsContext.Provider>
    );
};
