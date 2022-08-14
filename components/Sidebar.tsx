import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { Menu } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useAuth } from "@context/Auth";
import { getButtonData, MenuButton } from "@utils/MenuButtonsTypes";

const MenuButton: FC<{
    type:
        | "home"
        | "explore"
        | "notifications"
        | "messages"
        | "bookmarks"
        | "lists"
        | "profile"
        | "more";
    as?: "link" | "div";
}> = ({ type, as: buttonType = "link" }) => {
    const [buttonData, setButtonData] = useState<MenuButton>();
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        session && setButtonData(getButtonData(type, session));
    }, [type, session]);

    const Button = () => {
        return (
            <div
                className="flex max-h-min w-fit flex-row items-center justify-center overflow-scroll rounded-full p-[11px] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818]"
                onClick={() =>
                    buttonData?.disabled &&
                    toast("Sorry this hasn't been implemented yet.")
                }
            >
                <svg
                    viewBox="0 0 24 24"
                    className="w-[24.5px] max-w-full fill-[#e7e9ea] light:fill-[#0f1419]"
                >
                    {router.asPath == buttonData?.url
                        ? buttonData?.solidIcon
                        : buttonData?.icon}
                </svg>
                <span
                    className={`ml-[19px] mr-[15px] text-[19px] leading-[23px] xl:hidden ${
                        router.asPath == buttonData?.url && "font-semibold"
                    }`}
                >
                    {buttonData?.text}
                </span>
            </div>
        );
    };

    if (buttonType === "div") {
        return (
            <div className="w-full py-[4px]">
                <Button />
            </div>
        );
    }

    return (
        <Link
            href={
                buttonData?.url && !buttonData?.disabled ? buttonData?.url : ""
            }
        >
            <a className="w-full py-[4px]">
                <Button />
            </a>
        </Link>
    );
};

export const Sidebar: FC = () => {
    const { userProfile, signOut } = useAuth();

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
            placement: "top-start",
            strategy: "fixed",
            modifiers: [
                {
                    name: "flip",
                    options: {
                        allowedAutoPlacements: ["bottom-end"],
                        fallbackPlacements: ["bottom-end", "top-start"],
                        altBoundary: true,
                    },
                },
            ],
        }
    );

    const [userReferenceElement, setUserReferenceElement] = useState(null);
    const [userPopperElement, setUserPopperElement] = useState(null);
    const { styles: userStyles, attributes: userAttributes } = usePopper(
        userReferenceElement,
        userPopperElement,
        {
            placement: "top",
            strategy: "fixed",
            modifiers: [
                {
                    name: "flip",
                    options: {
                        allowedAutoPlacements: ["bottom-start"],
                        fallbackPlacements: ["bottom-start", "top-start"],
                        altBoundary: true,
                    },
                },
                {
                    name: "offset",
                    options: {
                        offset: [0, -1],
                    },
                },
            ],
        }
    );

    return (
        <div className="sticky top-0 flex h-min min-h-screen w-[275px] flex-col justify-between px-[11px] xl:max-w-[88px] xl:items-center">
            <div className="xl:max-w-[47px]">
                <Link href="/home">
                    <a>
                        <div className="my-[2px] -ml-px min-h-[47px] w-auto min-w-[47px] max-w-[50px] rounded-full p-[11px] light:hover:bg-[#e8f5fd] dim:hover:bg-[#162d3f] dark:hover:bg-[#031018]">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-7 fill-[#d6d9db] light:fill-[#1d9bf0]"
                            >
                                <g>
                                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                                </g>
                            </svg>
                        </div>
                    </a>
                </Link>

                <nav className="mt-[3px] flex flex-col items-start">
                    <MenuButton type="home" />
                    <MenuButton type="explore" />
                    <MenuButton type="notifications" />
                    <MenuButton type="messages" />
                    <MenuButton type="bookmarks" />
                    <MenuButton type="lists" />
                    <MenuButton type="profile" />
                    <Menu>
                        <Menu.Button
                            ref={setMoreReferenceElement}
                            as="button"
                            aria-label="More Options Menu"
                        >
                            <MenuButton type="more" as="div" />
                        </Menu.Button>
                        <Menu.Items
                            ref={setMorePopperElement}
                            style={moreStyles.popper}
                            {...moreAttributes.popper}
                            as="div"
                            className="bg-theme shadow-popup z-50 w-[210px] overflow-hidden rounded-[4px]"
                        >
                            <Menu.Item>
                                <div
                                    className="flex cursor-pointer flex-row items-center p-[15px] text-sm leading-[19px] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#16181c]"
                                    onClick={() =>
                                        toast(
                                            "Sorry this hasn't been implemented yet."
                                        )
                                    }
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="mr-[11px] w-[17.5px] max-w-full fill-[#e7e9ea] light:fill-[#0f1419]"
                                    >
                                        <g>
                                            <path d="M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.026-2.29-2.29S10.74 9.71 12 9.71s2.29 1.026 2.29 2.29-1.028 2.29-2.29 2.29z"></path>
                                            <path d="M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.473.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z"></path>
                                        </g>
                                    </svg>
                                    <span>Settings and privacy</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="https://support.twitter.com/">
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex cursor-pointer flex-row items-center p-[15px] text-sm leading-[19px] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#16181c]">
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="mr-[11px] w-[17.5px] max-w-full fill-[#e7e9ea] light:fill-[#0f1419]"
                                            >
                                                <g>
                                                    <path d="M12.025 22.75c-5.928 0-10.75-4.822-10.75-10.75S6.098 1.25 12.025 1.25 22.775 6.072 22.775 12s-4.822 10.75-10.75 10.75zm0-20c-5.1 0-9.25 4.15-9.25 9.25s4.15 9.25 9.25 9.25 9.25-4.15 9.25-9.25-4.15-9.25-9.25-9.25z"></path>
                                                    <path d="M13.064 17.47c0-.616-.498-1.114-1.114-1.114-.616 0-1.114.498-1.114 1.114 0 .615.498 1.114 1.114 1.114.616 0 1.114-.5 1.114-1.114zm3.081-7.528c0-2.312-1.882-4.194-4.194-4.194-2.312 0-4.194 1.882-4.194 4.194 0 .414.336.75.75.75s.75-.336.75-.75c0-1.485 1.21-2.694 2.695-2.694 1.486 0 2.695 1.21 2.695 2.694 0 1.486-1.21 2.695-2.694 2.695-.413 0-.75.336-.75.75v1.137c0 .414.337.75.75.75s.75-.336.75-.75v-.463c1.955-.354 3.445-2.06 3.445-4.118z"></path>
                                                </g>
                                            </svg>
                                            <span>Help Center</span>
                                        </div>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/i/display">
                                    <a>
                                        <div className="flex cursor-pointer flex-row items-center p-[15px] text-sm leading-[19px] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#16181c]">
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="mr-[11px] w-[17.5px] max-w-full fill-[#e7e9ea] light:fill-[#0f1419]"
                                            >
                                                <g className="fill-accent">
                                                    <path d="M8.18 16.99c-.19.154-.476.032-.504-.21-.137-1.214-.234-4.053 1.483-5.943.908-1 3.02-1.52 4.475-.198s1.14 3.473.23 4.473c-2.07 2.15-3.428.058-5.686 1.878z"></path>
                                                </g>
                                                <g>
                                                    <path d="M15.692 11.205l6.383-7.216c.45-.45.45-1.18 0-1.628-.45-.45-1.178-.45-1.627 0l-7.232 6.402s.782.106 1.595.93c.548.558.882 1.51.882 1.51z"></path>
                                                    <path d="M17.45 22.28H3.673c-1.148 0-2.083-.946-2.083-2.11V7.926c0-1.165.934-2.112 2.082-2.112h5.836c.414 0 .75.336.75.75s-.336.75-.75.75H3.672c-.32 0-.583.274-.583.612V20.17c0 .336.26.61.582.61h13.78c.32 0 .583-.273.583-.61v-6.28c0-.415.336-.75.75-.75s.75.335.75.75v6.28c0 1.163-.934 2.11-2.084 2.11z"></path>
                                                </g>
                                            </svg>
                                            <span>Display</span>
                                        </div>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <div
                                    className="flex cursor-pointer flex-row items-center p-[15px] text-sm leading-[19px] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#16181c]"
                                    onClick={() =>
                                        toast(
                                            "Sorry this hasn't been implemented yet."
                                        )
                                    }
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="mr-[11px] w-[17.5px] max-w-full fill-[#e7e9ea] light:fill-[#0f1419]"
                                    >
                                        <g>
                                            <circle
                                                cx="12"
                                                cy="6.674"
                                                r="1.889"
                                            ></circle>
                                            <path d="M9.828 14.817l-1.62 3.342c-.138.41.083.857.495.995s.858-.083.996-.495l1.602-3.176c.28-.557 1.076-.556 1.356 0l1.608 3.195c.138.41.584.632.996.494.412-.138.633-.584.495-.996l-1.62-3.342.032.07-.123-.262c-.483-1.027-.535-2.19-.16-3.24.106-.302.392-.505.712-.505h2.032c.434 0 .786-.353.786-.787 0-.434-.352-.786-.786-.786H7.37c-.435 0-.787.352-.787.786 0 .434.352.786.786.786h1.985c.32 0 .606.2.713.503.374 1.05.323 2.214-.158 3.24l-.125.263"></path>
                                            <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
                                        </g>
                                    </svg>
                                    <span>Keyboard shortcuts</span>
                                </div>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </nav>

                <Link href="">
                    <a>
                        <div
                            className="bg-accent mt-[19px] flex min-h-[49px] w-[227px] min-w-[49px] items-center justify-center rounded-full px-8 hover:brightness-95 xl:-ml-px xl:w-[49px] xl:p-0"
                            onClick={() =>
                                toast("Sorry this hasn't been implemented yet.")
                            }
                        >
                            <span className="h-fit text-[19px] text-base font-bold leading-4 xl:hidden">
                                Tweet
                            </span>
                            <svg
                                viewBox="0 0 24 24"
                                className="hidden w-[23px] fill-[#e7e9ea] light:fill-white xl:block"
                            >
                                <g>
                                    <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                                </g>
                            </svg>
                        </div>
                    </a>
                </Link>
            </div>

            {!isSSR && userProfile && (
                <Menu>
                    <Menu.Button ref={setUserReferenceElement}>
                        <div className="my-[11px] box-content cursor-pointer rounded-full p-[11px] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818] xl:max-h-[38px] xl:max-w-[38px]">
                            <div className="flex w-auto flex-row justify-between xl:items-center">
                                <div className="flex max-h-[38px] flex-row xl:max-w-[38px]">
                                    <Image
                                        src={
                                            userProfile?.profile_image_url
                                                ? userProfile?.profile_image_url
                                                : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                                        }
                                        alt="Profile picture"
                                        width={38}
                                        height={38}
                                        layout="fixed"
                                        className="rounded-full"
                                    />

                                    <div className="mx-[11px] mt-0.5 flex flex-col items-start xl:hidden">
                                        <span className="text-sm font-bold leading-4">
                                            {userProfile?.name
                                                ? userProfile?.name
                                                : ""}
                                        </span>
                                        <span className="text-sm font-medium leading-[22px] text-[#71767C]">
                                            {userProfile?.username
                                                ? "@" + userProfile?.username
                                                : ""}
                                        </span>
                                    </div>
                                </div>

                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-[17.5px] fill-[#e7e9ea] light:fill-[#0f1419] xl:hidden"
                                >
                                    <g>
                                        <circle cx="5" cy="12" r="2"></circle>
                                        <circle cx="12" cy="12" r="2"></circle>
                                        <circle cx="19" cy="12" r="2"></circle>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </Menu.Button>
                    <Menu.Items
                        ref={setUserPopperElement}
                        style={userStyles.popper}
                        {...userAttributes.popper}
                        className="bg-theme shadow-popup w-[300px] rounded-2xl py-[11px]"
                    >
                        <Menu.Item>
                            <div className="flex flex-row justify-between px-[15px] py-[11px]">
                                <div className="flex flex-row items-center">
                                    <Image
                                        src={
                                            userProfile?.profile_image_url
                                                ? userProfile?.profile_image_url
                                                : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                                        }
                                        alt="Profile picture"
                                        width={46}
                                        height={46}
                                        layout="fixed"
                                        className="rounded-full"
                                    />
                                    <div className="mx-[11px] mt-[3px] flex flex-col justify-start">
                                        <span className="text-sm font-bold leading-4">
                                            {userProfile?.name}
                                        </span>
                                        <span className="text-sm font-medium leading-[22px] text-[#71767C]">
                                            @{userProfile?.username}
                                        </span>
                                    </div>
                                </div>

                                <svg
                                    viewBox="0 0 24 24"
                                    className="fill-accent w-[17.5px]"
                                >
                                    <g>
                                        <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                    </g>
                                </svg>
                            </div>
                        </Menu.Item>
                        <div className="h-px w-full light:bg-[#eff3f4] dim:bg-[#38444d] dark:bg-[#2f3336]" />
                        <Menu.Item>
                            <div
                                className="cursor-pointer p-[15px] text-sm leading-[19px] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#16181c]"
                                onClick={() =>
                                    toast(
                                        "Sorry this hasn't been implemented yet."
                                    )
                                }
                            >
                                <span className="text-[#e7e9ea] light:text-black">
                                    Add an existing account
                                </span>
                            </div>
                        </Menu.Item>
                        <Menu.Item>
                            <div
                                className="cursor-pointer p-[15px] text-sm leading-[19px] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#16181c]"
                                onClick={signOut}
                            >
                                <span className="text-[#e7e9ea] light:text-black">
                                    Log out @{userProfile?.username}
                                </span>
                            </div>
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            )}
        </div>
    );
};

export default Sidebar;
