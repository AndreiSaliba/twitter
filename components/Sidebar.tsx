import { FC, forwardRef, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
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
    const { session, currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        session && setButtonData(getButtonData(type, currentUser));
    }, [session, type, currentUser]);

    const Button = () => {
        return (
            <div
                className="flex max-h-min w-fit cursor-pointer flex-row items-center justify-center rounded-full p-[11px] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818]"
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

    return buttonData?.url && !buttonData?.disabled && buttonType !== "div" ? (
        <Link href={buttonData?.url}>
            <a className="w-full py-[4px]">
                <Button />
            </a>
        </Link>
    ) : (
        <div className="w-full py-[4px]">
            <Button />
        </div>
    );
};

export const Sidebar: FC = () => {
    const { currentUser, signOut } = useAuth();
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

    const DisplayNextLink = forwardRef<LinkProps, { children: ReactNode }>(
        (props, ref) => {
            const { children, ...rest } = props;
            return (
                <Link
                    href={
                        router.pathname === "/[user]"
                            ? `/[user]?user=${router.asPath.slice(
                                  1
                              )}&display=true"`
                            : `${router.asPath}?display=true`
                    }
                    as="/i/display"
                    shallow={true}
                >
                    <a {...rest}>{children}</a>
                </Link>
            );
        }
    );
    DisplayNextLink.displayName = "DisplayNextLink";

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
                                            <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
                                        </g>
                                    </svg>
                                    <span>Settings and privacy</span>
                                </div>
                            </Menu.Item>
                            <Menu.Item as={"div"}>
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
                                                    <path d="M11.57 11.96l.99-.79c.33-.26.56-.53.7-.8.15-.27.22-.57.22-.91 0-.41-.12-.74-.38-.97s-.62-.35-1.09-.35-.85.12-1.13.37c-.26.25-.4.59-.4 1.03 0 .2.03.42.08.65l-2.07-.15c-.06-.29-.09-.55-.09-.79 0-.84.33-1.51.98-2.01.67-.49 1.55-.74 2.66-.74 1.17 0 2.07.24 2.71.73.63.48.95 1.16.95 2.04 0 .98-.47 1.86-1.4 2.65l-.87.73c-.17.15-.29.28-.36.4-.06.11-.09.26-.09.45v.46h-2.1v-.67c0-.3.06-.55.17-.75.12-.2.29-.39.52-.58zm-.52 5.17c.24.25.56.37.93.37.39 0 .7-.12.94-.37.25-.25.37-.56.37-.94 0-.39-.12-.7-.37-.95-.24-.25-.55-.37-.94-.37-.37 0-.69.12-.93.37s-.36.56-.36.95c0 .38.12.69.36.94zM22.25 12c0 5.66-4.59 10.25-10.25 10.25S1.75 17.66 1.75 12 6.34 1.75 12 1.75 22.25 6.34 22.25 12zM12 20.25c4.56 0 8.25-3.69 8.25-8.25S16.56 3.75 12 3.75 3.75 7.44 3.75 12s3.69 8.25 8.25 8.25z"></path>
                                                </g>
                                            </svg>
                                            <span>Help Center</span>
                                        </div>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item as={DisplayNextLink}>
                                <div className="flex cursor-pointer flex-row items-center p-[15px] text-sm leading-[19px] light:hover:bg-[#f7f9f9] dim:hover:bg-[#1e2732] dark:hover:bg-[#16181c]">
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="mr-[11px] w-[17.5px] max-w-full fill-[#e7e9ea] light:fill-[#0f1419]"
                                    >
                                        <g>
                                            <path d="M20 12h2v6.5c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 21 2 19.88 2 18.5v-13C2 4.12 3.12 3 4.5 3H11v2H4.5c-.28 0-.5.22-.5.5v13c0 .28.22.5.5.5h15c.27 0 .5-.22.5-.5V12zm2.31-6.78l-6.33 7.18c-.2 2.02-1.91 3.6-3.98 3.6H8v-4c0-2.07 1.58-3.78 3.6-3.98l7.18-6.33c.99-.88 2.49-.83 3.43.1.93.94.98 2.44.1 3.43zm-1.52-2.01c-.19-.19-.49-.2-.69-.02l-6.08 5.36c.59.35 1.08.84 1.43 1.43l5.36-6.08c.18-.2.17-.5-.02-.69z"></path>
                                        </g>
                                        <g className="fill-accent">
                                            <path d="M14 12c0-1.1-.9-2-2-2-1.11 0-2 .9-2 2v2h2c1.1 0 2-.9 2-2z"></path>
                                        </g>
                                    </svg>
                                    <span>Display</span>
                                </div>
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
                                            <g>
                                                <path d="M11.999 22.25c-5.652 0-10.25-4.598-10.25-10.25S6.347 1.75 11.999 1.75 22.249 6.348 22.249 12s-4.598 10.25-10.25 10.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25-3.701-8.25-8.25-8.25zm.445 6.992c1.747-.096 3.748-.689 3.768-.695l.575 1.916c-.077.022-1.616.48-3.288.689v.498c.287 1.227 1.687 2.866 2.214 3.405l-1.428 1.4c-.188-.191-1.518-1.576-2.286-3.144-.769 1.568-2.098 2.952-2.286 3.144l-1.428-1.4c.527-.54 1.927-2.178 2.214-3.405v-.498c-1.672-.209-3.211-.667-3.288-.689l.575-1.916c.02.006 2.021.6 3.768.695m0 0c.301.017.59.017.891 0M12 6.25c-.967 0-1.75.78-1.75 1.75s.783 1.75 1.75 1.75 1.75-.78 1.75-1.75-.784-1.75-1.75-1.75z"></path>
                                            </g>
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

            {!isSSR && currentUser && (
                <Menu>
                    <Menu.Button ref={setUserReferenceElement}>
                        <div className="my-[11px] box-content cursor-pointer rounded-full p-[11px] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818] xl:max-h-[38px] xl:max-w-[38px]">
                            <div className="flex w-auto flex-row justify-between xl:items-center">
                                <div className="flex max-h-[38px] flex-row xl:max-w-[38px]">
                                    <Image
                                        src={
                                            currentUser?.profile_image_url
                                                ? currentUser?.profile_image_url
                                                : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                                        }
                                        alt="Profile picture"
                                        width={38}
                                        height={38}
                                        layout="fixed"
                                        className="rounded-full"
                                    />

                                    <div className="mx-[11px] mt-0.5 flex flex-col items-start xl:hidden">
                                        <span className="flex flex-row items-center">
                                            <span className="text-sm font-bold leading-4">
                                                {currentUser?.name
                                                    ? currentUser?.name
                                                    : ""}
                                            </span>
                                            {currentUser?.verified && (
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
                                        <span className="text-sm font-medium leading-[22px] text-[#71767C]">
                                            {currentUser?.username
                                                ? "@" + currentUser?.username
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
                        className="bg-theme shadow-popup relative z-[999] w-[300px] rounded-2xl py-[11px]"
                    >
                        <Menu.Item>
                            <div className="flex flex-row justify-between px-[15px] py-[11px]">
                                <div className="flex flex-row items-center">
                                    <Image
                                        src={
                                            currentUser?.profile_image_url
                                                ? currentUser?.profile_image_url
                                                : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                                        }
                                        alt="Profile picture"
                                        width={46}
                                        height={46}
                                        layout="fixed"
                                        className="rounded-full"
                                    />
                                    <div className="mx-[11px] mt-[3px] flex flex-col justify-start">
                                        <span className="flex flex-row">
                                            <span className="text-sm font-bold leading-4">
                                                {currentUser?.name
                                                    ? currentUser?.name
                                                    : ""}
                                            </span>
                                            {currentUser?.verified && (
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
                                        <span className="text-sm font-medium leading-[22px] text-[#71767C]">
                                            @{currentUser?.username}
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
                                    Log out @{currentUser?.username}
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
