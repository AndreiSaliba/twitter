import { create_tweet, getTweets } from "@utils/Database";
import { supabase } from "@utils/supabaseClient";
import { TweetType } from "@utils/types";
import { createContext, useContext, useEffect, useState } from "react";
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
            value={{ tweets, createTweet, deleteTweet, refreshTweets }}
        >
            {children}
        </TweetsContext.Provider>
    );
};
