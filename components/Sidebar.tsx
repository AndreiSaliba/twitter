import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
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
        | "more"
        | "compose";
}> = ({ type }) => {
    const [buttonData, setButtonData] = useState<MenuButton>();
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        session && setButtonData(getButtonData(type, session));
    }, [type, session]);

    return (
        <Link href={buttonData && !buttonData?.disabled ? buttonData?.url : ""}>
            <a className="w-full py-[4px]">
                <div
                    className="flex h-fit w-fit flex-row items-center justify-center rounded-full p-[11px] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818]"
                    onClick={() =>
                        buttonData?.disabled &&
                        toast("Sorry this hasn't been implemented yet.")
                    }
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="w-[24.5px] max-w-full fill-[#e7e9ea] light:fill-[#0f1419]"
                    >
                        {router.pathname == buttonData?.url
                            ? buttonData?.solidIcon
                            : buttonData?.icon}
                    </svg>
                    <span
                        className={`ml-[19px] mr-[15px] text-[19px] leading-[23px] xl:hidden ${
                            router.pathname == buttonData?.url &&
                            "font-semibold"
                        }`}
                    >
                        {buttonData?.text}
                    </span>
                </div>
            </a>
        </Link>
    );
};

export default function Sidebar() {
    const { session } = useAuth();

    return (
        <div className="sticky top-0 flex h-screen w-[275px] flex-col justify-between px-[11px] xl:max-w-[88px] xl:items-center">
            <div className="xl:max-w-[47px]">
                <Link href="/home">
                    <a>
                        <div className="my-[2px] -ml-px min-h-[47px] min-w-[47px] rounded-full p-[11px] light:hover:bg-[#e8f5fd] dim:hover:bg-[#162d3f] dark:hover:bg-[#031018]">
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

                <nav className="items-star mt-[3px] flex flex-col">
                    <MenuButton type="home" />
                    <MenuButton type="explore" />
                    <MenuButton type="notifications" />
                    <MenuButton type="messages" />
                    <MenuButton type="bookmarks" />
                    <MenuButton type="lists" />
                    <MenuButton type="profile" />
                    <MenuButton type="more" />
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
                                className="hidden w-[23px] fill-[#e7e9ea] light:fill-[#0f1419] xl:block"
                            >
                                <g>
                                    <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                                </g>
                            </svg>
                        </div>
                    </a>
                </Link>
            </div>

            <div className="my-[11px] box-content rounded-full p-[11px] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818] xl:max-h-[38px] xl:max-w-[38px]">
                <div className="flex w-auto flex-row justify-between xl:items-center">
                    <div className="flex max-h-[38px] flex-row xl:max-w-[38px]">
                        <Image
                            src={
                                session?.user?.user_metadata?.userProfile
                                    ? session?.user?.user_metadata?.userProfile
                                          ?.profile_image_url
                                    : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                            }
                            alt="Profile picture"
                            width={38}
                            height={38}
                            layout="fixed"
                            className="rounded-full"
                        />
                        <div className="mx-[11px] mt-0.5 flex flex-col justify-start xl:hidden">
                            <span className="text-sm font-bold leading-4">
                                FirstClass
                            </span>
                            <span className="text-sm font-medium leading-[22px] text-[#71767C]">
                                @FirstCllass
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
        </div>
    );
}