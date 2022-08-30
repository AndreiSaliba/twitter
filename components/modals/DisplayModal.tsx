import Button from "@components/Button";
import { Accent, Theme, useTheme } from "@context/Theme";
import { Dialog, RadioGroup } from "@headlessui/react";
import Image from "next/future/image";
import { useRouter } from "next/router";

function DisplayModal() {
    const router = useRouter();
    const { changeTheme, theme, accent } = useTheme();

    return (
        <Dialog
            as="div"
            className="relative z-10"
            open={!!router.query.display}
            onClose={() =>
                router.push(
                    router.pathname === "/[user]"
                        ? `/${router?.query?.user}`
                        : router.pathname,
                    undefined,
                    { shallow: true }
                )
            }
        >
            <div className="fixed inset-0 z-[55] bg-[#5B7085] bg-opacity-40" />
            <div className="fixed inset-0 z-[60] overflow-y-auto font-TwitterChirp">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel className="bg-theme flex w-[600px] transform flex-col justify-end overflow-hidden rounded-2xl p-[30px] text-left align-middle shadow-xl transition-all">
                        <div className="mb-[11px] flex w-full justify-center">
                            <span className="text-center text-[22px] font-extrabold leading-[27px]">
                                Customize your view
                            </span>
                        </div>

                        <div className="mb-[19px] flex w-full justify-center">
                            <span className="break-words text-center text-[14px] leading-[19px] light:text-[#536471] dim:text-[#8B98A5] dark:text-[#71767C]">
                                Manage your color and background. These settings
                                affect all the Twitter accounts on this browser.
                            </span>
                        </div>

                        <div className="mx-[30px] mb-[14px] flex min-h-[100px] flex-row rounded-2xl border px-[15px] pt-[10px] light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2F3336]">
                            <div className="mt-px mr-[11px] min-w-[46px]">
                                <Image
                                    src="https://pbs.twimg.com/profile_images/1013798240683266048/zRim1x6M_normal.jpg"
                                    alt="Profile Picture"
                                    width={46}
                                    height={46}
                                    className="rounded-full"
                                />
                            </div>

                            <div className="pb-[12px]">
                                <div className="mb-0.5 flex flex-row flex-wrap items-center text-sm leading-[19px]">
                                    <span className="truncate font-bold text-[#E9EAE7] light:text-[#141923]">
                                        Twitter
                                    </span>
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-label="Verified account"
                                        className="ml-0.5 h-[17.5xp] w-[17.5px] light:fill-blue dim:fill-white dark:fill-[#d6d9db]"
                                    >
                                        <g>
                                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                        </g>
                                    </svg>

                                    <span className="flex flex-row flex-wrap light:text-[#536471] dim:text-[#8B98A5] dark:text-[#71767C]">
                                        <span className="ml-1">@Twitter</span>
                                        <span className="px-1">·</span>
                                        <span>10m</span>
                                    </span>
                                </div>
                                <div>
                                    <div className="break-words text-sm leading-[19px] text-[#E9EAE7] light:text-[#141923]">
                                        At the heart of Twitter are short
                                        messages called Tweets — just like this
                                        one — which can include photos, videos,
                                        links, text, hashtags, and mentions like{" "}
                                        <span className="text-accent w-fit hover:underline">
                                            @Twitter
                                        </span>
                                        .
                                    </div>
                                </div>
                            </div>
                        </div>

                        <span className="mb-[5px] w-full align-top text-xs font-bold leading-[19px] light:text-[#536471] dim:text-[#8B98A5] dark:text-[#71767C]">
                            Color
                        </span>
                        <div className="mb-[10px] flex w-full flex-col items-center justify-center rounded-2xl py-[4px] light:bg-[#f7f9f9] dim:bg-[#1e2732] dark:bg-[#16181c]">
                            <RadioGroup
                                value={accent}
                                onChange={(accent: Accent) =>
                                    changeTheme(accent)
                                }
                                className="flex min-h-[53px] w-full flex-row flex-wrap items-center justify-around"
                            >
                                <RadioGroup.Option
                                    value="blue-accent"
                                    className="flex justify-center maxSM:w-1/3 maxSM:py-1"
                                >
                                    {({ checked }) => (
                                        <div
                                            className={`rounded-full p-[3px] ${
                                                !checked && "hover:bg-blue/10"
                                            }`}
                                        >
                                            <button className="flex h-[40.3334px] w-[40.3334px] items-center justify-center rounded-full bg-blue">
                                                {checked && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="h-[25px] w-[25px] fill-[#f2f9fe]"
                                                        aria-hidden="true"
                                                    >
                                                        <g>
                                                            <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                        </g>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                    value="yellow-accent"
                                    className="flex justify-center maxSM:w-1/3 maxSM:py-1"
                                >
                                    {({ checked }) => (
                                        <div
                                            className={`rounded-full p-[3px]  ${
                                                !checked && "hover:bg-yellow/10"
                                            }`}
                                        >
                                            <button className="flex h-[40.3334px] w-[40.3334px] items-center justify-center rounded-full bg-yellow">
                                                {checked && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="h-[25px] w-[25px] fill-[#f2f9fe]"
                                                        aria-hidden="true"
                                                    >
                                                        <g>
                                                            <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                        </g>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                    value="pink-accent"
                                    className="flex justify-center maxSM:w-1/3 maxSM:py-1"
                                >
                                    {({ checked }) => (
                                        <div
                                            className={`rounded-full p-[3px]  ${
                                                !checked && "hover:bg-pink/10"
                                            }`}
                                        >
                                            <button className="flex h-[40.3334px] w-[40.3334px] items-center justify-center rounded-full bg-pink">
                                                {checked && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="h-[25px] w-[25px] fill-[#f2f9fe]"
                                                        aria-hidden="true"
                                                    >
                                                        <g>
                                                            <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                        </g>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                    value="purple-accent"
                                    className="flex justify-center maxSM:w-1/3 maxSM:py-1"
                                >
                                    {({ checked }) => (
                                        <div
                                            className={`rounded-full p-[3px]  ${
                                                !checked && "hover:bg-purple/10"
                                            }`}
                                        >
                                            <button className="flex h-[40.3334px] w-[40.3334px] items-center justify-center rounded-full bg-purple">
                                                {checked && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="h-[25px] w-[25px] fill-[#f2f9fe]"
                                                        aria-hidden="true"
                                                    >
                                                        <g>
                                                            <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                        </g>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                    value="orange-accent"
                                    className="flex justify-center maxSM:w-1/3 maxSM:py-1"
                                >
                                    {({ checked }) => (
                                        <div
                                            className={`rounded-full p-[3px]  ${
                                                !checked && "hover:bg-orange/10"
                                            }`}
                                        >
                                            <button className="flex h-[40.3334px] w-[40.3334px] items-center justify-center rounded-full bg-orange">
                                                {checked && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="h-[25px] w-[25px] fill-[#f2f9fe]"
                                                        aria-hidden="true"
                                                    >
                                                        <g>
                                                            <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                        </g>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                    value="green-accent"
                                    className="flex justify-center maxSM:w-1/3 maxSM:py-1"
                                >
                                    {({ checked }) => (
                                        <div
                                            className={`rounded-full p-[3px]  ${
                                                !checked && "hover:bg-green/10"
                                            }`}
                                        >
                                            <button className="flex h-[40.3334px] w-[40.3334px] items-center justify-center rounded-full bg-green">
                                                {checked && (
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="h-[25px] w-[25px] fill-[#f2f9fe]"
                                                        aria-hidden="true"
                                                    >
                                                        <g>
                                                            <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                        </g>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </RadioGroup.Option>
                            </RadioGroup>
                        </div>

                        <span className="mb-[5px] w-full align-top text-xs font-bold leading-[19px] light:text-[#536471] dim:text-[#8B98A5] dark:text-[#71767C] ">
                            Background
                        </span>
                        <div className="mb-[11px] flex flex-col items-center justify-center rounded-2xl px-[11px] py-[4px] light:bg-[#f7f9f9] dim:bg-[#1e2732] dark:bg-[#16181c]">
                            <RadioGroup
                                value={theme}
                                onChange={(theme: Theme) => changeTheme(theme)}
                                className="flex w-full flex-row flex-wrap items-center justify-around maxSM:flex-col"
                            >
                                <RadioGroup.Option
                                    value="light-theme"
                                    className="maxSM:w-full"
                                >
                                    {({ checked }) => (
                                        <button
                                            className={`m-1 flex min-h-[64px] cursor-pointer flex-row items-center rounded-[4px] bg-white px-[20px] py-1 maxSM:w-full ${
                                                checked
                                                    ? "border-accent border-2"
                                                    : "border border-[#333639]"
                                            }`}
                                        >
                                            <div className="flex min-w-full flex-row items-center justify-center">
                                                <div
                                                    className={`-mx-[11px] flex h-[40px] w-[40px] items-center justify-center rounded-full ${
                                                        checked
                                                            ? "hover-shadow-accent"
                                                            : "hover:bg-[#f1f1f2]"
                                                    }`}
                                                >
                                                    <div
                                                        className={`h-[20px] w-[20px] rounded-full border-2 ${
                                                            checked
                                                                ? "bg-accent border-accent"
                                                                : "border-[#c1d0d8]"
                                                        }`}
                                                    >
                                                        {checked && (
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                className="fill-[#f2f9fe]"
                                                                aria-hidden="true"
                                                            >
                                                                <g>
                                                                    <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                                </g>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>

                                                <span className="ml-[5px] min-w-[99px] text-sm font-bold leading-[19px] text-[#0F1419]">
                                                    Default
                                                </span>
                                            </div>
                                        </button>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                    value="dim-theme"
                                    className="maxSM:w-full"
                                >
                                    {({ checked }) => (
                                        <button
                                            className={`m-1 flex min-h-[64px] cursor-pointer flex-row items-center rounded-[4px] bg-dim px-[20px] maxSM:w-full ${
                                                checked
                                                    ? "border-accent border-2"
                                                    : "border border-[#333639]"
                                            }`}
                                        >
                                            <div className="flex min-w-full flex-row items-center justify-center">
                                                <div
                                                    className={`-mx-[11px] flex h-[40px] w-[40px] items-center justify-center rounded-full  ${
                                                        checked
                                                            ? "hover-shadow-accent"
                                                            : "hover:bg-[#1f2934]"
                                                    }`}
                                                >
                                                    <div
                                                        className={`h-[20px] w-[20px] rounded-full border-2 ${
                                                            checked
                                                                ? "border-accent bg-accent"
                                                                : "border-[#5C6E7E]"
                                                        }`}
                                                    >
                                                        {checked && (
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                className="fill-[#f2f9fe]"
                                                                aria-hidden="true"
                                                            >
                                                                <g>
                                                                    <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                                </g>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>

                                                <span className="ml-[5px] min-w-[99px] text-sm font-bold leading-[19px] text-[#F7F7F9]">
                                                    Dim
                                                </span>
                                            </div>
                                        </button>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option
                                    value="dark-theme"
                                    className="maxSM:w-full"
                                >
                                    {({ checked }) => (
                                        <button
                                            className={`m-1 flex min-h-[64px] min-w-[164px] cursor-pointer flex-row items-center rounded-[4px] bg-black px-[20px] py-1 maxSM:w-full ${
                                                checked
                                                    ? "border-accent border-2"
                                                    : "border border-[#333639]"
                                            }`}
                                        >
                                            <div className="flex min-w-full flex-row items-center justify-center">
                                                <div
                                                    className={`-mx-[11px] flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full ${
                                                        checked
                                                            ? "hover-shadow-accent"
                                                            : "hover:bg-[#0e0f11]"
                                                    }`}
                                                >
                                                    <div
                                                        className={`h-[20px] w-[20px] rounded-full border-2 ${
                                                            checked
                                                                ? "border-accent bg-accent"
                                                                : "border-[#3E4144]"
                                                        }`}
                                                    >
                                                        {checked && (
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                className="fill-[#f2f9fe]"
                                                                aria-hidden="true"
                                                            >
                                                                <g>
                                                                    <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                                                                </g>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>

                                                <span className="ml-[5px] min-w-[99px] text-sm font-bold leading-[19px] text-[#F7F7F9]">
                                                    Lights out
                                                </span>
                                            </div>
                                        </button>
                                    )}
                                </RadioGroup.Option>
                            </RadioGroup>
                        </div>

                        <div className="mt-[15px] flex w-full justify-center">
                            <Button
                                variant="rounded"
                                color="accent"
                                className="h-[34px] w-[66.8px]"
                                textClassName="text-sm leading-[19px] font-bold"
                                onClick={() =>
                                    router.push(
                                        router.pathname === "/[user]"
                                            ? `/${router?.query?.user}`
                                            : router.pathname,
                                        undefined,
                                        { shallow: true }
                                    )
                                }
                            >
                                Done
                            </Button>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}

export default DisplayModal;
