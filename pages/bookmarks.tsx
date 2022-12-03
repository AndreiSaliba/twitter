import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "@context/Auth";
import { TweetType } from "@utils/types";
import DB from "@utils/Database";
import HomeLayout from "@layouts/HomeLayout";
import Header from "@components/Header";
import Tweet from "@components/Tweet";

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState<TweetType[]>();
    const { session, currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    useEffect(() => {
        currentUser &&
            DB.getUserBookmarks(currentUser?.userid).then((data) =>
                setBookmarks(data)
            );
    }, [currentUser]);

    const follow = (userID: string) => {
        DB.followUser(userID, currentUser?.userid);
        setBookmarks((prevState) => {
            let temp = prevState;
            temp && temp.forEach((tweet) => (tweet.user.followsAuthor = true));
            return temp;
        });
    };

    const unfollow = (userID: string) => {
        DB.unfollowUser(userID, currentUser?.userid);
        setBookmarks((prevState) => {
            let temp = prevState;
            temp && temp.forEach((tweet) => (tweet.user.followsAuthor = false));
            return temp;
        });
    };

    const deleteTweet = (tweetID: string) => {
        DB.deleteTweet(tweetID).then(() => {
            let temp = [...bookmarks];
            temp = temp.filter((tweet) => tweet.tweet.tweet_id != tweetID);
            setBookmarks(temp);
        });
    };

    const removeBookmark = (userID: string, tweetID: string) => {
        DB.removeBookmark(userID, tweetID).then(() => {
            const temp = [...bookmarks];
            const tweetIndex = temp.findIndex(
                (tweet) => tweet.tweet.tweet_id == tweetID
            );
            tweetIndex != -1 && temp.splice(tweetIndex, 1);
            setBookmarks(temp);
            toast("Tweet removed from your bookmarks");
        });
    };

    const clearAllBookmarks = () => {
        DB.clearBookmarks(currentUser?.userid).then(() => setBookmarks(null));
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
                            page="Bookmarks"
                            data={tweet}
                            follow={follow}
                            unfollow={unfollow}
                            deleteTweet={deleteTweet}
                            removeBookmark={removeBookmark}
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
                                <span className="mb-[27px] text-sm leading-[19px] light:text-[#536471] dim:text-[#8B98A5] dark:text-[#71767B]">
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
