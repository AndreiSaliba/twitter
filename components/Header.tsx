import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { usePopper } from "react-popper";

interface HeaderProps {
    variant: "home" | "notifications";
}

interface ProfileHeaderProps {
    variant: "profile";
    name: string;
    tweetCount: number;
}

interface BookmarksHeaderProps {
    variant: "bookmarks";
    username: string;
    isBookmarkEmpty: boolean;
    clearAllBookmarks: () => void;
}

const Header: FC<HeaderProps | ProfileHeaderProps | BookmarksHeaderProps> = (
    props
) => {
    const router = useRouter();
    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    const [moreReferenceElement, setMoreReferenceElement] = useState(null);
    const [morePopperElement, setMorePopperElement] = useState(null);
    const { styles: moreStyles, attributes: moreAttributes } = usePopper(
        moreReferenceElement,
        morePopperElement,
        {
            placement: "left",
            strategy: "absolute",
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
                    options: { offset: [8, -37] },
                },
            ],
        }
    );

    switch (props.variant) {
        case "home":
            return (
                <div className="bg-theme-blur sticky top-0 z-10 flex h-[50px] w-full items-center p-[15px]">
                    <span className="py-0.5 text-[19px] font-bold leading-[23px] text-[#E9EAE7] light:text-[#0f1419]">
                        Latest Tweets
                    </span>
                </div>
            );
        case "notifications":
            return (
                <div className="bg-theme-blur sticky top-0 z-10 flex h-[50px] w-full items-center p-[15px]">
                    <span className="py-0.5 text-[19px] font-bold leading-[23px] text-[#E9EAE7] light:text-[#0f1419]">
                        Notifications
                    </span>
                </div>
            );

        case "bookmarks":
            const { username } = props;
            return (
                <div className="bg-theme-blur sticky top-0 z-10 flex h-[50px] w-full items-center justify-between p-[15px]">
                    {!isSSR && (
                        <>
                            <div className="flex flex-col">
                                <span className="py-0.5 text-[19px] font-bold leading-[23px] text-[#E9EAE7] light:text-[#0f1419]">
                                    Bookmarks
                                </span>
                                <span className="text-[12px] leading-[15px] light:text-[#0f1419] dim:text-[#8B98A5] dark:text-[#71767B]">
                                    @{username}
                                </span>
                            </div>
                            {props.isBookmarkEmpty && (
                                <Menu>
                                    <Menu.Button
                                        ref={setMoreReferenceElement}
                                        as="div"
                                        aria-label="More Options Menu"
                                        className=""
                                    >
                                        <button
                                            id="menu-button"
                                            className="group w-fit rounded-full p-[8px] hover:bg-[#EFF3F4]/10 light:hover:bg-[#0F1419]/10"
                                        >
                                            <svg
                                                className="w-min min-w-[17.5px] fill-[#EFF3F4] light:fill-[#0F1419]"
                                                viewBox="0 0 24 24"
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
                                        </button>
                                    </Menu.Button>
                                    <Menu.Items
                                        ref={setMorePopperElement}
                                        style={moreStyles.popper}
                                        {...moreAttributes.popper}
                                        as="div"
                                        className="bg-theme shadow-popup z-50 overflow-hidden rounded-[4px]"
                                    >
                                        <div
                                            className="flex cursor-pointer flex-row items-center fill-[#F42121] p-[15px] text-sm leading-[19px] text-[#F42121] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#16181c]"
                                            onClick={() =>
                                                props.clearAllBookmarks()
                                            }
                                        >
                                            <span>Clear all Bookmarks</span>
                                        </div>
                                    </Menu.Items>
                                </Menu>
                            )}
                        </>
                    )}
                </div>
            );

        case "profile":
            const { name, tweetCount } = props;
            return (
                <div className="bg-theme-blur sticky top-0 z-10 flex h-[50px] w-full items-center p-[15px]">
                    <div className="-ml-[6.5px] w-[59.5px]">
                        <div
                            className="w-min cursor-pointer rounded-full p-[7px] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818]"
                            onClick={() => router.back()}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                className="w-[19px] fill-[#e7e9ea] light:fill-[#0f1419]"
                            >
                                <g>
                                    <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span
                            className="py-0.5 text-[19px] font-bold leading-[23px] text-[#E9EAE7] light:text-[#0f1419]"
                            suppressHydrationWarning
                        >
                            {name}
                        </span>
                        <span
                            className="text-xs leading-[15px] text-[#71767C] light:text-[#536471] dim:text-[#8b98a5]"
                            suppressHydrationWarning
                        >
                            {`${tweetCount} ${
                                tweetCount == 1 ? "Tweet" : "Tweets"
                            }`}
                        </span>
                    </div>
                </div>
            );
        default:
            return null;
    }
};

export default Header;
