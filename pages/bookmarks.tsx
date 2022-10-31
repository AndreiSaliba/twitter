import { useEffect, useState } from "react";
import Header from "@components/Header";
import { useAuth } from "@context/Auth";
import { useRouter } from "next/router";
import HomeLayout from "@layouts/HomeLayout";
import {
    clearBookmarks,
    getUserBookmarks,
    removeBookmark,
} from "@utils/Database";
import { TweetType } from "@utils/types";
import Tweet from "@components/Tweet";
import toast from "react-hot-toast";
import Image from "next/image";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState<TweetType[]>();
    const { session, currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    useEffect(() => {
        currentUser &&
            getUserBookmarks(currentUser?.userid).then((data) =>
                setBookmarks(data)
            );
    }, [currentUser]);

    const clearAllBookmarks = () => {
        clearBookmarks(currentUser?.userid).then(() => setBookmarks(null));
    };

    const deleteBookmark = (userID: string, tweetID: string) => {
        removeBookmark(userID, tweetID).then(() => {
            const temp = [...bookmarks];
            const tweetIndex = temp.findIndex(
                (tweet) => tweet.tweet.tweet_id == tweetID
            );
            tweetIndex != -1 && temp.splice(tweetIndex, 1);
            setBookmarks(temp);
            toast("Tweet removed from your bookmarks");
        });
    };

    return (
        <>
            <Header
                variant="bookmarks"
                username={currentUser?.username}
                isBookmarkEmpty={bookmarks?.length > 0}
                clearAllBookmarks={clearAllBookmarks}
            />
            <>
                {bookmarks ? (
                    bookmarks.map((tweet, index) => (
                        <Tweet
                            key={index}
                            data={tweet}
                            deleteOnBookmarkPage={deleteBookmark}
                        />
                    ))
                ) : (
                    <div className="my-[30px] flex w-full items-center justify-center">
                        <div className="flex min-h-[316px] max-w-[380px] flex-col px-[30px]">
                            <div className="mt-[15px] mb-[28px]">
                                <Image
                                    src="https://abs.twimg.com/sticky/illustrations/empty-states/book-in-bird-cage-400x200.v1.png"
                                    alt=""
                                    width={320}
                                    height={160}
                                ></Image>
                            </div>
                            <div className="flex flex-col">
                                <span className="mb-[8px] text-[29px] font-extrabold leading-[34px] light:text-[#0F1419] dim:text-[#F7F9F9] dark:text-[#E7E9EA]">
                                    Save Tweets for later
                                </span>
                                <span className="mb-[27px] text-sm leading-[19px] dim:text-[#8B98A5] dark:text-[#71767B] light:text-[#536471]">
                                    Don’t let the good ones fly away! Bookmark
                                    Tweets to easily find them again in the
                                    future.
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </>
    );
};

Bookmarks.PageLayout = HomeLayout;

export default Bookmarks;
