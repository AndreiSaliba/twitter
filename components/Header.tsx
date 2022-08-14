import { useRouter } from "next/router";
import { FC } from "react";

interface HeaderProps {
    variant: "home" | "notifications";
}

interface ProfileHeaderProps {
    variant: "profile";
    name: string;
    tweetCount: number;
}

const Header: FC<HeaderProps | ProfileHeaderProps> = (props) => {
    const router = useRouter();

    switch (props.variant) {
        case "home":
            return (
                <div className="bg-theme-blur sticky top-0 z-50 flex h-[50px] w-full items-center p-[15px]">
                    <span className="py-0.5 text-[19px] font-bold leading-[23px] text-[#E9EAE7] light:text-[#0f1419]">
                        Latest Tweets
                    </span>
                </div>
            );
        case "notifications":
            return (
                <div className="bg-theme-blur sticky top-0 z-50 flex h-[50px] w-full items-center p-[15px]">
                    <span className="py-0.5 text-[19px] font-bold leading-[23px] text-[#E9EAE7] light:text-[#0f1419]">
                        Notifications
                    </span>
                </div>
            );
        case "profile":
            const { name, tweetCount } = props;
            return (
                <div className="bg-theme-blur sticky top-0 z-50 flex h-[50px] w-full items-center p-[15px]">
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
