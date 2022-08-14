import React, { FC, ButtonHTMLAttributes } from "react";

interface SharedProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

interface RoundedButtonProps extends SharedProps {
    variant: "rounded";
    color:
        | "blue"
        | "transparent"
        | "transparent-blue"
        | "white"
        | "white-black";
    authProvider?: "Google" | "Github";
}

interface FollowButtonProps extends SharedProps {
    variant: "follow" | "following";
}

const Button: FC<RoundedButtonProps | FollowButtonProps> = (props) => {
    switch (props.variant) {
        case "rounded":
            const {
                variant,
                color,
                authProvider,
                className,
                children,
                ...rest
            } = props;
            let buttonColor;
            switch (color) {
                case "white":
                    buttonColor =
                        "bg-white text-black hover:bg-[#f2f2f2] border light:border-[#dadce0]";
                    break;
                case "blue":
                    buttonColor = "bg-blue p-1.5 hover:bg-[#1a8cd8] text-white";
                    break;
                case "transparent":
                    buttonColor =
                        "border border-[#536471] light:border-[#dadce0] hover:bg-[#181919] light:hover:bg-[#e6e7e7]";
                    break;
                case "transparent-blue":
                    buttonColor =
                        "border border-[#536471] light:border-[#dadce0] hover:bg-[#031018] light:hover:bg-[#e8f5fd] text-blue";
                    break;
                case "white-black":
                    buttonColor =
                        "text-black light:text-white border bg-white hover:bg-[#f2f2f2] light:border-[#dadce0] light:bg-[#0f1419] light:hover:bg-[#272c30]";
                    break;
            }

            let authProviderLogo;
            switch (authProvider) {
                case "Google":
                    authProviderLogo = (
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="mt-0.5 mr-1.5 w-5"
                        >
                            <g>
                                <path
                                    d="M18.977 4.322L16 7.3c-1.023-.838-2.326-1.35-3.768-1.35-2.69 0-4.95 1.73-5.74 4.152l-3.44-2.635c1.656-3.387 5.134-5.705 9.18-5.705 2.605 0 4.93.977 6.745 2.56z"
                                    fill="#EA4335"
                                ></path>
                                <path
                                    d="M6.186 12c0 .66.102 1.293.307 1.89L3.05 16.533C2.38 15.17 2 13.63 2 12s.38-3.173 1.05-4.533l3.443 2.635c-.204.595-.307 1.238-.307 1.898z"
                                    fill="#FBBC05"
                                ></path>
                                <path
                                    d="M18.893 19.688c-1.786 1.667-4.168 2.55-6.66 2.55-4.048 0-7.526-2.317-9.18-5.705l3.44-2.635c.79 2.42 3.05 4.152 5.74 4.152 1.32 0 2.474-.308 3.395-.895l3.265 2.533z"
                                    fill="#34A853"
                                ></path>
                                <path
                                    d="M22 12c0 3.34-1.22 5.948-3.107 7.688l-3.265-2.53c1.07-.67 1.814-1.713 2.093-3.063h-5.488V10.14h9.535c.14.603.233 1.255.233 1.86z"
                                    fill="#4285F4"
                                ></path>
                            </g>
                        </svg>
                    );
                    break;
                case "Github":
                    authProviderLogo = (
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="mt-0.5 mr-1.5 w-5"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    );
            }

            return (
                <button
                    className={`w-80 rounded-full p-1.5 ${buttonColor} ${className}`}
                    {...rest}
                >
                    <span className="flex flex-row items-center justify-center font-semibold">
                        {authProvider && authProviderLogo}
                        <span>{children}</span>
                    </span>
                </button>
            );

        case "follow":
            return (
                <button
                    className="flex h-[34px] cursor-pointer items-center rounded-full border border-transparent bg-[#eff3f4] px-[15px] hover:bg-[#d7dbdc] light:bg-[#0f1419]"
                    {...rest}
                >
                    <span className="select-none text-[14px] font-bold leading-[19px] text-black light:text-white">
                        Follow
                    </span>
                </button>
            );

        case "following":
            return (
                <button
                    className="group flex h-[34px] cursor-pointer items-center rounded-full border border-[#536571] px-[15px] hover:border-[#67070f] hover:bg-[#190305] hover:text-[#f4212e] light:border-[#CFD9DE] light:hover:border-[#fdc9ce] light:hover:bg-[#fee8ea] dim:hover:border-[#67070f] dim:hover:bg-[#2c202c]"
                    {...rest}
                >
                    <span className="w-[62.5px] select-none text-center text-[14px] font-bold leading-[19px] before:content-['Following'] group-hover:before:content-['Unfollow']" />
                </button>
            );
    }
};

export default Button;
