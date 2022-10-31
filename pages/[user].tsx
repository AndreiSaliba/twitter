import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/future/image";
import { Tab } from "@headlessui/react";
import { Linkify, LinkifyCore } from "react-easy-linkify";
import { useAuth } from "@context/Auth";
import {
    getUser,
    followUser,
    unfollowUser,
    getUserTweets,
} from "@utils/Database";
import { TweetType, UserProfile } from "@utils/types";
import HomeLayout from "@layouts/HomeLayout";
import Header from "@components/Header";
import Button from "@components/Button";
import Tweet from "@components/Tweet";

const User = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const [sessionUserProfile, setSessionUserProfile] = useState<UserProfile>();
    const [following, setFollowing] = useState<boolean>(false);
    const [tweets, setTweets] = useState<TweetType[]>();

    const { session, currentUser, refreshCurrentUser } = useAuth();

    const router = useRouter();
    const { user } = router.query;

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    useEffect(() => {
        if (user && session) {
            if (
                currentUser?.username.toLowerCase() ===
                (user as string).toLowerCase()
            ) {
                refreshCurrentUser();
            } else {
                setSessionUserProfile(currentUser);
                getUser(user as string, currentUser?.username).then((data) => {
                    if (data?.profile) {
                        setUserProfile(data.profile);
                        setFollowing(data.isFollowedByRequest);
                    } else {
                        router.push("/home");
                    }
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Get Current User profile page
    useEffect(() => {
        if (currentUser && user) {
            if (
                currentUser?.username.toLowerCase() ===
                (user as string).toLowerCase()
            ) {
                setUserProfile(currentUser);
            }
            setSessionUserProfile(currentUser);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    // Get User Tweets
    useEffect(() => {
        if (user && session) {
            getUserTweets(user as string, currentUser?.userID).then((data) =>
                setTweets(data)
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    LinkifyCore.PluginManager.enableMention();
    LinkifyCore.PluginManager.enableHashtag();

    const follow = () => {
        followUser(userProfile.userid, sessionUserProfile.userid);
        setUserProfile((prevState) => ({
            ...prevState,
            followers_count: userProfile.followers_count + 1,
        }));
        setFollowing(true);
    };

    const unfollow = () => {
        unfollowUser(userProfile.userid, sessionUserProfile.userid);
        setUserProfile((prevState) => ({
            ...prevState,
            followers_count: userProfile.followers_count - 1,
        }));
        setFollowing(false);
    };

    return (
        <>
            {userProfile && (
                <>
                    <Header
                        variant="profile"
                        name={userProfile?.name}
                        tweetCount={userProfile?.statuses_count}
                    />
                    <div className="relative">
                        {userProfile?.profile_banner_url &&
                        userProfile?.profile_banner_url.match(
                            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                        ) ? (
                            <div className="relative -z-10">
                                <Image
                                    src={userProfile.profile_banner_url}
                                    alt="Banner"
                                    width="600"
                                    height="200"
                                    className="-z-10 aspect-[3/1] object-cover"
                                />
                            </div>
                        ) : (
                            <div className="relative -z-10 aspect-[3/1] max-h-[200px] w-auto max-w-full bg-[#333639] light:bg-[#cfd9de] dim:bg-[#425364]" />
                        )}

                        <div className="absolute left-[15px] -bottom-[68px] flex h-[142px] w-1/4 items-center">
                            <div className="bg-theme border-theme -z-10 max-w-[142px] rounded-full border-4 xs:border-2">
                                <Image
                                    src={
                                        userProfile?.profile_image_url &&
                                        userProfile?.profile_image_url.match(
                                            /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                                        )
                                            ? userProfile?.profile_image_url
                                            : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                                    }
                                    alt=""
                                    width={134}
                                    height={134}
                                    className="aspect-square rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-[11px] w-full px-[15px] pt-[11px] ">
                        <div className="flex h-[68px] w-full justify-end">
                            {userProfile.userid ===
                            sessionUserProfile.userid ? (
                                <Link
                                    href={
                                        router.pathname === "/[user]"
                                            ? `/[user]?user=${router.asPath.slice(
                                                  1
                                              )}&editProfile=true"`
                                            : `${router.asPath}?editProfile=true`
                                    }
                                    as="/settings/profile"
                                    shallow={true}
                                >
                                    <a>
                                        <div className="flex h-[34px] cursor-pointer items-center rounded-full border border-[#536571] px-[15px] light:border-[#CFD9DE] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2b3640] dark:hover:bg-[#181919]">
                                            <span className="select-none text-[14px] font-bold leading-[19px] text-[#EFF3F4] light:text-[#0F1419]">
                                                Edit profile
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            ) : (
                                <>
                                    <div className="mr-2 flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[#536571] hover:bg-[#181919] light:border-[#CFD9DE] light:hover:bg-[#e5e6e6]">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-[19px] fill-[#eff3f4] light:fill-[#0f1419]"
                                        >
                                            <g>
                                                <circle
                                                    cx="5"
                                                    cy="12"
                                                    r="2"
                                                ></circle>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="2"
                                                ></circle>
                                                <circle
                                                    cx="19"
                                                    cy="12"
                                                    r="2"
                                                ></circle>
                                            </g>
                                        </svg>
                                    </div>
                                    {following ? (
                                        <div onClick={unfollow}>
                                            <Button variant="following" />
                                        </div>
                                    ) : (
                                        <div onClick={follow}>
                                            <Button variant="follow" />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="fill-[#71767C] text-[#71767C] light:fill-[#536471] light:text-[#536471] dim:fill-[#8B98A5] dim:text-[#8B98A5]">
                            <div className="mb-[15px] mt-1 flex w-full flex-col">
                                <span className="flex flex-row items-center">
                                    <span className="text-[19px] font-extrabold leading-[23px] text-[#E9EAE7] light:text-[#141923]">
                                        {userProfile?.name}
                                    </span>
                                    {userProfile?.verified && (
                                        <svg
                                            viewBox="0 0 24 24"
                                            aria-label="Verified account"
                                            className="ml-0.5 h-[19xp] w-[19px] light:fill-blue dim:fill-white dark:fill-[#d6d9db]"
                                        >
                                            <g>
                                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                            </g>
                                        </svg>
                                    )}
                                </span>
                                <span className="text-[14px] leading-[19px]">
                                    @{userProfile?.username}
                                </span>
                            </div>

                            {userProfile?.description && (
                                <div className="mb-[11px] flex w-full flex-col whitespace-pre-wrap text-[14px] leading-[19px] text-[#E9EAE7] light:text-[#141923]">
                                    <Linkify
                                        options={{
                                            className:
                                                "text-accent hover:underline w-fit",
                                            ignoreTags: [
                                                "script",
                                                "style",
                                                "img",
                                                "svg",
                                            ],
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
                                                        .replace(
                                                            /(^\w+:|^)\/\//,
                                                            ""
                                                        )
                                                        .replace("www.", ""),
                                            },
                                            formatHref: {
                                                hashtag: (href) =>
                                                    "/hashtag/" +
                                                    href.substring(1),
                                            },
                                        }}
                                    >
                                        {userProfile?.description}
                                    </Linkify>
                                </div>
                            )}

                            <div className="mb-[9px] flex w-full flex-row flex-wrap">
                                {userProfile?.location && (
                                    <span className="mr-[11px] flex flex-row items-end">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="mr-1 w-[17.5px]"
                                        >
                                            <g>
                                                <path d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"></path>
                                                <path d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.163 0 .327-.053.465-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"></path>
                                            </g>
                                        </svg>

                                        <span className="text-[14px] leading-[16px]">
                                            {userProfile?.location}
                                        </span>
                                    </span>
                                )}

                                {userProfile?.url && (
                                    <span className="mr-[11px] flex flex-row items-end">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="mr-1 w-[17.5px]"
                                        >
                                            <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                                            <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
                                        </svg>

                                        <Linkify
                                            className="flex items-center text-[14px] leading-[16px]"
                                            options={{
                                                className:
                                                    "text-accent hover:underline",
                                                ignoreTags: [
                                                    "script",
                                                    "style",
                                                    "img",
                                                    "svg",
                                                ],
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
                                                            .replace(
                                                                /(^\w+:|^)\/\//,
                                                                ""
                                                            )
                                                            .replace(
                                                                "www.",
                                                                ""
                                                            ),
                                                },
                                            }}
                                        >
                                            {userProfile?.url}
                                        </Linkify>
                                    </span>
                                )}

                                <span className="mr-[11px] flex flex-row items-end">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="mr-1 w-[17.5px]"
                                    >
                                        <g>
                                            <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                                            <circle
                                                cx="7.032"
                                                cy="8.75"
                                                r="1.285"
                                            ></circle>
                                            <circle
                                                cx="7.032"
                                                cy="13.156"
                                                r="1.285"
                                            ></circle>
                                            <circle
                                                cx="16.968"
                                                cy="8.75"
                                                r="1.285"
                                            ></circle>
                                            <circle
                                                cx="16.968"
                                                cy="13.156"
                                                r="1.285"
                                            ></circle>
                                            <circle
                                                cx="12"
                                                cy="8.75"
                                                r="1.285"
                                            ></circle>
                                            <circle
                                                cx="12"
                                                cy="13.156"
                                                r="1.285"
                                            ></circle>
                                            <circle
                                                cx="7.032"
                                                cy="17.486"
                                                r="1.285"
                                            ></circle>
                                            <circle
                                                cx="12"
                                                cy="17.486"
                                                r="1.285"
                                            ></circle>
                                        </g>
                                    </svg>
                                    <span className="text-[14px] leading-[16px]">
                                        Joined{" "}
                                        {new Date(
                                            userProfile?.created_at
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </span>
                                </span>
                            </div>

                            <div className="flex w-full flex-row flex-wrap">
                                <span className="mr-[19px] cursor-pointer hover:underline ">
                                    <span className="text-[13px] font-bold leading-[15px] text-[#e7e9ea] light:text-[#0F1419]">
                                        {userProfile.following_count}
                                    </span>{" "}
                                    <span className="text-[13px] leading-[15px]">
                                        Following
                                    </span>
                                </span>
                                <span className="mr-[19px] cursor-pointer hover:underline">
                                    <span className="text-[13px] font-bold leading-[15px] text-[#e7e9ea] light:text-[#0F1419]">
                                        {userProfile.followers_count}
                                    </span>{" "}
                                    <span className="text-[13px] leading-[15px]">
                                        Followers
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <Tab.Group>
                        <Tab.List className="flex h-[50px] w-full flex-row justify-between overflow-y-scroll scrollbar-hide">
                            {[
                                {
                                    text: "Tweets",
                                    width: "max-w-[140px]",
                                },
                                {
                                    text: "Tweets & replies",
                                    width: "max-w-[198px]",
                                },
                                {
                                    text: "Media",
                                    width: "max-w-[134px]",
                                },
                                {
                                    text: "Likes",
                                    width: "max-w-[127px]",
                                },
                            ].map((value, index) => (
                                <Tab
                                    className={`flex ${value.width} w-full items-center light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818]`}
                                    key={index}
                                >
                                    {({ selected }) => (
                                        <div className="flex w-full flex-row justify-center px-[15px]">
                                            <div className="flex h-[50px] w-min flex-col items-center justify-between">
                                                <span
                                                    className={`my-auto w-max min-w-[56px] pt-[6px] text-sm leading-[19px] ${
                                                        selected
                                                            ? "font-bold text-[#E7E9EA] light:text-[#0F1419]"
                                                            : "font-medium light:text-[#536571] dim:text-[#8B98A5] dark:text-[#71767C]"
                                                    }`}
                                                >
                                                    {value.text}
                                                </span>
                                                <div
                                                    className={`${
                                                        selected && "bg-accent"
                                                    } h-1 w-full rounded-full `}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </Tab>
                            ))}
                        </Tab.List>
                        <div className="h-px w-full light:bg-[#eff3f4] dim:bg-[#38444d] dark:bg-[#2f3336]" />
                        <Tab.Panels>
                            <Tab.Panel>
                                {tweets &&
                                    tweets.map((tweet, index) => (
                                        <Tweet
                                            key={index}
                                            data={tweet}
                                            followingState={following}
                                            follow={follow}
                                            unfollow={unfollow}
                                            onUserProfile={true}
                                            setUserTweets={setTweets}
                                        />
                                    ))}
                            </Tab.Panel>
                            <Tab.Panel>
                                {tweets &&
                                    tweets.map((tweet, index) => (
                                        <Tweet
                                            key={index}
                                            data={tweet}
                                            followingState={following}
                                            follow={follow}
                                            unfollow={unfollow}
                                            onUserProfile={true}
                                            setUserTweets={setTweets}
                                        />
                                    ))}
                            </Tab.Panel>
                            <Tab.Panel></Tab.Panel>
                            <Tab.Panel></Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </>
            )}
        </>
    );
};

User.PageLayout = HomeLayout;

export default User;
