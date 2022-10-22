import { FC, SetStateAction, useState } from "react";
import Image from "next/image";
import { TweetType } from "@utils/types";
import moment from "moment";
import { Linkify, LinkifyCore } from "react-easy-linkify";
import Link from "next/link";
import { Menu } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useAuth } from "@context/Auth";
import { useTweets } from "@context/Tweets";
import { followUser, getUserTweets, unfollowUser } from "@utils/Database";
import toast from "react-hot-toast";

interface TweetProps {
    data: TweetType;
    followingState?: boolean;
    follow?: () => void;
    unfollow?: () => void;
    onUserProfile?: boolean;
    setUserTweets?: (value: SetStateAction<TweetType[]>) => void;
}

const Tweet: FC<TweetProps> = ({
    data,
    followingState,
    follow,
    unfollow,
    onUserProfile,
    setUserTweets,
}) => {
    const { tweet, author } = data;
    const { currentUser } = useAuth();

    const { deleteTweet, refreshTweets } = useTweets();

    const [moreReferenceElement, setMoreReferenceElement] = useState(null);
    const [morePopperElement, setMorePopperElement] = useState(null);
    const { styles: moreStyles, attributes: moreAttributes } = usePopper(
        moreReferenceElement,
        morePopperElement,
        {
            placement: "bottom-end",
            strategy: "fixed",
            modifiers: [
                {
                    name: "flip",
                    options: {
                        allowedAutoPlacements: ["top-end"],
                        fallbackPlacements: ["bottom-end"],
                        altBoundary: true,
                    },
                },
            ],
        }
    );

    const [shareReferenceElement, setShareReferenceElement] = useState(null);
    const [sharePopperElement, setSharePopperElement] = useState(null);
    const { styles: shareStyles, attributes: shareAttributes } = usePopper(
        shareReferenceElement,
        sharePopperElement,
        {
            placement: "bottom-end",
            strategy: "fixed",
            modifiers: [
                {
                    name: "flip",
                    options: {
                        allowedAutoPlacements: ["top-end"],
                        fallbackPlacements: ["bottom-end"],
                        altBoundary: true,
                    },
                },
                {
                    name: "offset",
                    options: { offset: [0, -28] },
                },
            ],
        }
    );

    LinkifyCore.PluginManager.enableMention();
    LinkifyCore.PluginManager.enableHashtag();

    return (
        <div className="flex flex-row border-b px-[15px] pt-[11px] light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2F3336]">
            <Link href={`/${author.username}`}>
                <a className="mt-px mr-[11px] min-w-[46px]">
                    <Image
                        src={
                            author?.profile_image_url &&
                            author?.profile_image_url.match(
                                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                            )
                                ? author?.profile_image_url
                                : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                        }
                        alt="Profile Picture"
                        width={46}
                        height={46}
                        className="-z-10 aspect-square cursor-pointer rounded-full object-cover"
                    />
                </a>
            </Link>

            <div className="w-full pb-[11px]">
                <div className="-my-[6px] flex w-full flex-row items-center justify-between truncate bg-clip-padding">
                    <div className="flex items-center truncate text-sm leading-[19px]">
                        <Link href={`/${author.username}`} shallow>
                            <span className="flex cursor-pointer items-center hover:underline">
                                <a className="truncate font-bold text-[#E9EAE7] light:text-[#141923]">
                                    {author.name}
                                </a>
                                {author.verified && (
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-label="Verified account"
                                        className="ml-0.5 h-[17.5xp] w-[17.5px] light:fill-blue dim:fill-white dark:fill-[#d6d9db]"
                                    >
                                        <g>
                                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                        </g>
                                    </svg>
                                )}
                            </span>
                        </Link>

                        <span className="flex flex-row truncate light:text-[#536471] dim:text-[#8B98A5] dark:text-[#71767C]">
                            <Link href={`/${author.username}`}>
                                <a className="ml-1 cursor-pointer truncate">
                                    @{author.username}
                                </a>
                            </Link>
                            <span className="truncate px-1">·</span>
                            <span>
                                {moment.utc(tweet.created_at).fromNow(true)}
                            </span>
                        </span>
                    </div>

                    <Menu>
                        <Menu.Button
                            ref={setMoreReferenceElement}
                            as="div"
                            aria-label="More Options Menu"
                            className=""
                        >
                            <button
                                id="menu-button"
                                className="group w-fit rounded-full p-[8px] hover:bg-[#1d9bf0]/10"
                            >
                                <svg
                                    className="w-min min-w-[17.5px] group-hover:fill-[#1d9bf0] light:fill-[#536471] dim:fill-[#9092A3] dark:fill-[#71767C]"
                                    viewBox="0 0 24 24"
                                >
                                    <g>
                                        <circle cx="5" cy="12" r="2"></circle>
                                        <circle cx="12" cy="12" r="2"></circle>
                                        <circle cx="19" cy="12" r="2"></circle>
                                    </g>
                                </svg>
                            </button>
                        </Menu.Button>
                        <Menu.Items
                            ref={setMorePopperElement}
                            style={moreStyles.popper}
                            {...moreAttributes.popper}
                            as="div"
                            className="bg-theme shadow-popup z-50 w-[210px] overflow-hidden rounded-[4px]"
                        >
                            {currentUser?.userid === author?.userid ? (
                                <Menu.Item>
                                    <div
                                        className="flex cursor-pointer flex-row items-center fill-[#F42121] p-[15px] text-sm leading-[19px] text-[#F42121] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#080808]"
                                        onClick={() =>
                                            deleteTweet(tweet.tweet_id).then(
                                                () => {
                                                    onUserProfile &&
                                                        getUserTweets(
                                                            currentUser?.username as string
                                                        ).then((data) => {
                                                            setUserTweets(data);
                                                        });
                                                }
                                            )
                                        }
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="mr-[11px] w-[17.5px] max-w-full"
                                        >
                                            <g>
                                                <path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path>
                                                <path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path>
                                            </g>
                                        </svg>
                                        <span>Delete</span>
                                    </div>
                                </Menu.Item>
                            ) : (
                                <Menu.Item>
                                    <div
                                        className="flex cursor-pointer flex-row items-center p-[15px] text-sm leading-[19px] light:text-[#0F1419] light:hover:bg-[#f7f9f9] dim:text-[#F7F9F9] dim:hover:bg-[#1e2732] dark:text-[#E7E9EA] dark:hover:bg-[#080808]"
                                        onClick={() =>
                                            followingState != null
                                                ? followingState
                                                    ? unfollow()
                                                    : follow()
                                                : data.isFollowedByRequest
                                                ? unfollowUser(
                                                      author.userid,
                                                      currentUser.userid
                                                  ).then(() => refreshTweets())
                                                : followUser(
                                                      author.userid,
                                                      currentUser.userid
                                                  ).then(() => refreshTweets())
                                        }
                                    >
                                        {(
                                            followingState != null
                                                ? followingState
                                                : data.isFollowedByRequest
                                        ) ? (
                                            <>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    className="mr-[11px] w-[17.5px] max-w-full light:fill-[#536571] dim:fill-[#8B98A5] dark:fill-[#71767B]"
                                                >
                                                    <g>
                                                        <path d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm12.586 3l-2.043-2.04 1.414-1.42L20 7.59l2.043-2.05 1.414 1.42L21.414 9l2.043 2.04-1.414 1.42L20 10.41l-2.043 2.05-1.414-1.42L18.586 9zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"></path>
                                                    </g>
                                                </svg>
                                                <span>
                                                    Unfollow @{author.username}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    className="mr-[11px] w-[17.5px] max-w-full light:fill-[#536571] dim:fill-[#8B98A5] dark:fill-[#71767B]"
                                                >
                                                    <g>
                                                        <path d="M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zm13 4v3h2v-3h3V8h-3V5h-2v3h-3v2h3zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46z"></path>
                                                    </g>
                                                </svg>
                                                <span>
                                                    Follow @{author.username}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </Menu.Item>
                            )}
                        </Menu.Items>
                    </Menu>
                </div>
                <div>
                    <div className="whitespace-pre-wrap break-words text-sm leading-[19px] text-[#E7E9EA] light:text-[#141923]">
                        <Linkify
                            options={{
                                className: "text-accent hover:underline w-fit",
                                ignoreTags: ["script", "style", "img", "svg"],
                                target: {
                                    url: "_blank",
                                },
                                linkWrapper: (props) => {
                                    return (
                                        <Link href={props.href}>
                                            <a
                                                {...props}
                                                rel="nofollow noreferrer noopener"
                                            >
                                                {props.children}
                                            </a>
                                        </Link>
                                    );
                                },
                                format: {
                                    url: (value) =>
                                        value
                                            .replace(/(^\w+:|^)\/\//, "")
                                            .replace("www.", ""),
                                },
                                formatHref: {
                                    hashtag: (href) =>
                                        "/hashtag/" + href.substring(1),
                                },
                            }}
                        >
                            {tweet.tweet_text}
                        </Linkify>
                    </div>
                </div>
                <div className="-mb-[8px]  mt-[3px] -ml-[8px] flex w-full max-w-[425px] flex-row justify-between">
                    <button
                        id="comment-button"
                        className="group w-fit rounded-full p-[8px] hover:bg-[#1d9bf0]/10"
                    >
                        <svg
                            className="w-min min-w-[17.5px] group-hover:fill-[#1d9bf0] light:fill-[#536471] dim:fill-[#9092A3] dark:fill-[#71767C]"
                            viewBox="0 0 24 24"
                        >
                            <g>
                                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                            </g>
                        </svg>
                    </button>
                    <button
                        id="retweet-button"
                        className="group w-fit rounded-full p-[8px] hover:bg-[#00BA7C]/10"
                    >
                        <svg
                            className="w-min min-w-[17.5px] group-hover:fill-[#00BA7C] light:fill-[#536471] dim:fill-[#9092A3] dark:fill-[#71767C]"
                            viewBox="0 0 24 24"
                        >
                            <g>
                                <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                            </g>
                        </svg>
                    </button>
                    <button
                        id="like-button"
                        className="group w-fit rounded-full p-[8px] hover:bg-[#F91880]/10"
                    >
                        <svg
                            className="w-min min-w-[17.5px] group-hover:fill-[#F91880] light:fill-[#536471] dim:fill-[#9092A3] dark:fill-[#71767C]"
                            viewBox="0 0 24 24"
                        >
                            <g>
                                <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                            </g>
                        </svg>
                    </button>

                    <Menu>
                        <Menu.Button
                            ref={setShareReferenceElement}
                            as="div"
                            aria-label="More Options Menu"
                            className=""
                        >
                            <button
                                id="share-button"
                                className="group w-fit rounded-full p-[8px] hover:bg-[#1d9bf0]/10"
                            >
                                <svg
                                    className="w-min min-w-[17.5px] group-hover:fill-[#1d9bf0] light:fill-[#536471] dim:fill-[#9092A3] dark:fill-[#71767C]"
                                    viewBox="0 0 24 24"
                                >
                                    <g>
                                        <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                                        <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                                    </g>
                                </svg>
                            </button>
                        </Menu.Button>
                        <Menu.Items
                            ref={setSharePopperElement}
                            style={shareStyles.popper}
                            {...shareAttributes.popper}
                            as="div"
                            className="bg-theme shadow-popup z-50 w-[210px] overflow-hidden rounded-[4px]"
                        >
                            <Menu.Item>
                                <div
                                    className="flex cursor-pointer flex-row items-center p-[15px] text-sm leading-[19px] light:text-[#0F1419] light:hover:bg-[#f7f9f9] dim:text-[#F7F9F9] dim:hover:bg-[#1e2732] dark:text-[#E7E9EA] dark:hover:bg-[#080808]"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `${document.location.origin}/${
                                                author.username
                                            }/status/${BigInt(tweet.public_id)}`
                                        );
                                        toast("Copied to clipboard");
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="mr-[11px] w-[17.5px] max-w-full light:fill-[#536571] dim:fill-[#8B98A5] dark:fill-[#71767B]"
                                    >
                                        <g>
                                            <path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path>
                                        </g>
                                    </svg>
                                    <span>Copy link to Tweet</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <div className="flex cursor-pointer flex-row items-center p-[15px] text-sm leading-[19px] light:text-[#0F1419] light:hover:bg-[#f7f9f9] dim:text-[#F7F9F9] dim:hover:bg-[#1e2732] dark:text-[#E7E9EA] dark:hover:bg-[#080808]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="mr-[11px] w-[17.5px] max-w-full light:fill-[#536571] dim:fill-[#8B98A5] dark:fill-[#71767B]"
                                    >
                                        <g>
                                            <path d="M17 3V0h2v3h3v2h-3v3h-2V5h-3V3h3zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V11h2v11.94l-8-5.71-8 5.71V4.5C4 3.12 5.119 2 6.5 2h4.502v2H6.5z"></path>
                                        </g>
                                    </svg>
                                    <span>Bookmark</span>
                                </div>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
