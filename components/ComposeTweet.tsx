import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@context/Auth";
import Button from "./Button";

interface ComposeTweetProps {
    createTweet: (authorID: string, tweetText: string) => void;
}

const ComposeTweet: FC<ComposeTweetProps> = (props) => {
    const { currentUser } = useAuth();
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);

    const [composeValue, setComposeValue] = useState<string>("");
    const composeRef = useRef(null);
    const excessRef = useRef(null);
    const maxLength = 280;

    const handleChange = (e) => {
        let inputValue = e.target.innerHTML;
        if (inputValue.length > maxLength) {
            if (!excessRef.current) {
                excessRef.current = document.createElement("span");
            }
            const inputValueNode = new DOMParser().parseFromString(
                inputValue,
                "text/html"
            );
            const inputValueText = inputValueNode.body.textContent;
            composeRef.current.textContent = inputValueText.slice(0, maxLength);
            excessRef.current.textContent = inputValueText.slice(maxLength);
            excessRef.current.classList.add("bg-[#8a0d20]");
            e.target.appendChild(excessRef.current);

            inputValue = e.target.innerHTML;
        } else {
            if (excessRef.current) {
                excessRef.current.remove();
                excessRef.current = null;
            }
        }

        setComposeValue(inputValue);
        setCursor();
    };

    const setCursor = () => {
        if (composeRef.current && composeRef.current.childNodes[0]) {
            const range = document.createRange();
            const sel = window.getSelection();

            const underLimit = composeRef?.current?.childNodes[0];
            const overLimit =
                composeRef?.current?.childNodes[1]?.childNodes[0] || null;

            const valueLength =
                underLimit.textContent.length +
                (overLimit?.textContent?.length || 0);

            if (valueLength > maxLength) {
                range.setStart(overLimit, overLimit?.textContent?.length);
            } else {
                range.setStart(underLimit, underLimit?.textContent?.length);
            }

            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };

    useEffect(() => {
        if (composeRef.current?.childNodes[0]?.nodeType) {
            setCursor();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [composeValue]);

    return (
        <div className="flex h-min min-h-[102px] w-full flex-row items-start border-b px-[15px] pt-1 pb-[13px] light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
            <div className="mt-1 mr-[11px] min-h-[46px] min-w-[46px]">
                {!isSSR && (
                    <Image
                        src={
                            currentUser?.profile_image_url &&
                            currentUser?.profile_image_url.match(
                                /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                            )
                                ? currentUser?.profile_image_url
                                : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                        }
                        alt=""
                        width={46}
                        height={46}
                        className="aspect-square rounded-full object-cover"
                    />
                )}
            </div>

            <div className="w-full max-w-[511px]">
                <div className="w-full pt-[15px]">
                    <span
                        ref={composeRef}
                        className="peer inline-block max-h-[712px] w-full max-w-[511px] overflow-y-scroll whitespace-pre-wrap break-words py-1 pl-0.5 text-[19px] leading-[23px] outline-none before:empty:content-[attr(placeholder)] light:text-[#0F1419] light:before:empty:text-[#8B98A5] dim:text-[#F7F9F9] dim:before:empty:text-[#8B98A5] dark:text-[#E7E9EA] dark:before:empty:text-[#71767B]"
                        placeholder="What&#x2019;s happening?"
                        contentEditable
                        onInput={(e) => {
                            handleChange(e);
                        }}
                        dangerouslySetInnerHTML={{ __html: composeValue }}
                    ></span>

                    <div className="-ml-2 mt-[11px] h-px w-full light:peer-focus:bg-[#eff3f4] dim:peer-focus:bg-[#38444d] dark:peer-focus:bg-[#2f3336]" />
                    <div className="-ml-px flex flex-row items-end justify-between">
                        <div className="mt-[11px] flex w-full flex-row">
                            <div className="mr-0.5 h-full max-h-[32px] w-full max-w-[32px]">
                                <button
                                    className="enabled-hover-shadow-accent -ml-[5px] w-fit rounded-full p-[7px] disabled:opacity-50"
                                    disabled
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="fill-accent w-min min-w-[19px]"
                                    >
                                        <g>
                                            <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                                            <circle
                                                cx="8.868"
                                                cy="8.309"
                                                r="1.542"
                                            ></circle>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                            <div className="mr-0.5 h-full max-h-[32px] w-full max-w-[32px]">
                                <button
                                    className="enabled-hover-shadow-accent -ml-[5px] w-fit rounded-full p-[7px] disabled:opacity-50"
                                    disabled
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="fill-accent w-min min-w-[19px]"
                                    >
                                        <g>
                                            <path d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"></path>
                                            <path d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                            <div className="mr-0.5 h-full max-h-[32px] w-full max-w-[32px]">
                                <button
                                    className="enabled-hover-shadow-accent -ml-[5px] w-fit rounded-full p-[7px] disabled:opacity-50"
                                    disabled
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="fill-accent w-min min-w-[19px]"
                                    >
                                        <g>
                                            <path d="M20.222 9.16h-1.334c.015-.09.028-.182.028-.277V6.57c0-.98-.797-1.777-1.778-1.777H3.5V3.358c0-.414-.336-.75-.75-.75s-.75.336-.75.75V20.83c0 .415.336.75.75.75s.75-.335.75-.75v-1.434h10.556c.98 0 1.778-.797 1.778-1.777v-2.313c0-.095-.014-.187-.028-.278h4.417c.98 0 1.778-.798 1.778-1.778v-2.31c0-.983-.797-1.78-1.778-1.78zM17.14 6.293c.152 0 .277.124.277.277v2.31c0 .154-.125.28-.278.28H3.5V6.29h13.64zm-2.807 9.014v2.312c0 .153-.125.277-.278.277H3.5v-2.868h10.556c.153 0 .277.126.277.28zM20.5 13.25c0 .153-.125.277-.278.277H3.5V10.66h16.722c.153 0 .278.124.278.277v2.313z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                            <div className="mr-0.5 h-full max-h-[32px] w-full max-w-[32px]">
                                <button
                                    className="enabled-hover-shadow-accent -ml-[5px] w-fit rounded-full p-[7px] disabled:opacity-50"
                                    disabled
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="fill-accent w-min min-w-[19px]"
                                    >
                                        <g>
                                            <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
                                            <path d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"></path>
                                            <circle
                                                cx="14.738"
                                                cy="9.458"
                                                r="1.478"
                                            ></circle>
                                            <circle
                                                cx="9.262"
                                                cy="9.458"
                                                r="1.478"
                                            ></circle>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                            <div className="mr-0.5 h-full max-h-[32px] w-full max-w-[32px]">
                                <button
                                    className="enabled-hover-shadow-accent -ml-[5px] w-fit rounded-full p-[7px] disabled:opacity-50"
                                    disabled
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="fill-accent w-min min-w-[19px]"
                                    >
                                        <g>
                                            <path d="M-37.9 18c-.1-.1-.1-.1-.1-.2.1 0 .1.1.1.2z"></path>
                                            <path d="M-37.9 18c-.1-.1-.1-.1-.1-.2.1 0 .1.1.1.2zM18 2.2h-1.3v-.3c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.3H7.7v-.3c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.3H4.8c-1.4 0-2.5 1.1-2.5 2.5v13.1c0 1.4 1.1 2.5 2.5 2.5h2.9c.4 0 .8-.3.8-.8 0-.4-.3-.8-.8-.8H4.8c-.6 0-1-.5-1-1V7.9c0-.3.4-.7 1-.7H18c.6 0 1 .4 1 .7v1.8c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-5c-.1-1.4-1.2-2.5-2.6-2.5zm1 3.7c-.3-.1-.7-.2-1-.2H4.8c-.4 0-.7.1-1 .2V4.7c0-.6.5-1 1-1h1.3v.5c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-.5h7.5v.5c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-.5H18c.6 0 1 .5 1 1v1.2z"></path>
                                            <path d="M15.5 10.4c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.8-6.2-6.2-6.2zm0 11c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7c0 2.5-2.1 4.7-4.7 4.7z"></path>
                                            <path d="M18.9 18.7c-.1.2-.4.4-.6.4-.1 0-.3 0-.4-.1l-3.1-2v-3c0-.4.3-.8.8-.8.4 0 .8.3.8.8v2.2l2.4 1.5c.2.2.3.6.1 1z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>

                            <div className="mr-0.5 h-full max-h-[32px] w-full max-w-[32px]">
                                <button
                                    className="enabled-hover-shadow-accent -ml-[5px] w-fit rounded-full p-[7px] disabled:opacity-50"
                                    disabled
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="fill-accent w-min min-w-[19px]"
                                    >
                                        <g>
                                            <path d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"></path>
                                            <path d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.163 0 .327-.053.465-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <Button
                            variant="rounded"
                            color="accent"
                            className="mr-0.5 -mb-px h-[34px] w-full max-w-[71.5px] disabled:opacity-50"
                            textClassName="text-[14px]"
                            onClick={() => {
                                props?.createTweet(
                                    currentUser?.userid,
                                    composeValue
                                );
                                setComposeValue("");
                                if (composeRef?.current?.innerText) {
                                    composeRef.current.innerText = "";
                                }
                            }}
                            disabled={
                                composeValue == null ||
                                composeValue == "" ||
                                composeValue.length > maxLength
                            }
                        >
                            Tweet
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComposeTweet;
