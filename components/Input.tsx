import {
    useState,
    forwardRef,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    DetailedHTMLProps,
} from "react";

type passwordState = "shown" | "hidden" | "other";

interface Props<T> extends InputHTMLAttributes<T>, TextareaHTMLAttributes<T> {
    variant: "floating";
    as?: "input" | "textarea";
    placeholder?: string;
    className?: string;
    error?: boolean;
    charCounter?: boolean;
}

const Input = forwardRef<any, Props<HTMLInputElement | HTMLTextAreaElement>>(
    (props, ref) => {
        const {
            type,
            as,
            variant,
            placeholder,
            className,
            error,
            charCounter,
            ...rest
        } = props;

        const [inputCharCount, setInputCharCount] = useState<number>(
            props?.defaultValue?.toString()?.length ?? 0
        );
        const [revealPassword, setRevealPassword] = useState<passwordState>(
            type === "password" ? "hidden" : "other"
        );

        switch (variant) {
            case "floating":
                return (
                    <div
                        className={`relative z-0 box-border flex w-80 rounded-[0.2rem] p-2 pt-6 shadow-[0_0_0_1px] focus-within:shadow-[0_0_0_2px] ${
                            error
                                ? "shadow-[#f4212e] focus-within:shadow-[#f4212e]"
                                : "shadow-[#333639] focus-within:shadow-blue light:shadow-[#dadce0] light:focus-within:shadow-blue"
                        } ${className}`}
                    >
                        {as === "textarea" ? (
                            <textarea
                                ref={ref}
                                id="floating"
                                className="text-md peer block w-full resize-none appearance-none bg-transparent px-0 leading-[23px] text-white focus:outline-none focus:ring-0 light:text-black"
                                placeholder=""
                                rows={3}
                                {...(rest.onChange = (e) =>
                                    setInputCharCount(e.target.value.length))}
                                {...rest}
                            />
                        ) : (
                            <input
                                ref={ref}
                                id="floating"
                                className="text-md peer block w-full appearance-none bg-transparent px-0 text-white focus:outline-none focus:ring-0 light:text-black"
                                type={
                                    type === "password"
                                        ? revealPassword === "shown"
                                            ? "text"
                                            : "password"
                                        : type
                                }
                                placeholder=""
                                {...(rest.onChange = (e) =>
                                    setInputCharCount(e.target.value.length))}
                                {...rest}
                            />
                        )}
                        <label
                            htmlFor="floating"
                            className={`absolute top-3.5 -z-10 origin-[0] -translate-y-6 transform  duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-80 peer-focus:text-blue ${
                                error
                                    ? "text-[#f4212e] peer-focus:text-[#f4212e]"
                                    : "text-[#71767b] peer-focus:text-blue"
                            }`}
                        >
                            {placeholder}
                        </label>
                        {charCounter && (
                            <span className="absolute top-0.5 right-2 hidden scale-80 text-sm text-[#71767b] peer-focus:inline">
                                {`${inputCharCount} / ${props.maxLength}`}
                            </span>
                        )}
                        {revealPassword !== "other" &&
                        revealPassword === "hidden" ? (
                            <span
                                className="ml-2.5 h-fit rounded-full p-0.5 hover:bg-[#181919] light:hover:bg-[#e6e7e7]"
                                onClick={() => setRevealPassword("shown")}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-5 fill-white light:fill-black"
                                >
                                    <g>
                                        <path d="M14.548 11.634c-1.207 0-2.188-.98-2.188-2.188 0-.664.302-1.25.77-1.653-.363-.097-.736-.165-1.13-.165-2.416 0-4.375 1.96-4.375 4.376S9.585 16.38 12 16.38c2.418 0 4.377-1.96 4.377-4.376 0-.4-.07-.78-.17-1.146-.402.47-.992.776-1.66.776z"></path>
                                        <path d="M12 19.79c-7.228 0-10.12-6.724-10.24-7.01-.254-.466-.254-1.105.035-1.642C1.88 10.923 4.772 4.2 12 4.2s10.12 6.723 10.24 7.01c.254.465.254 1.104-.035 1.64-.085.216-2.977 6.94-10.205 6.94zm0-14c-6.154 0-8.668 5.787-8.772 6.033-.068.135-.068.208-.033.273.137.316 2.65 6.104 8.805 6.104 6.18 0 8.747-5.973 8.772-6.033.07-.136.07-.21.034-.274-.138-.316-2.652-6.103-8.806-6.103z"></path>
                                    </g>
                                </svg>
                            </span>
                        ) : (
                            revealPassword === "shown" && (
                                <span
                                    className="ml-2.5 h-fit rounded-full p-0.5 hover:bg-[#181919] light:hover:bg-[#e6e7e7]"
                                    onClick={() => setRevealPassword("hidden")}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 fill-white light:fill-black"
                                    >
                                        <g>
                                            <path d="M7.625 12.004c0 .15.03.292.044.438l4.777-4.778c-.147-.018-.294-.036-.447-.036-2.416 0-4.375 1.96-4.375 4.376zm8.752 0c0-.156-.018-.306-.037-.456l-4.786 4.787c.15.015.293.045.446.045 2.418 0 4.377-1.96 4.377-4.376z"></path>
                                            <path d="M20.806 11.893c.036.064.036.138-.034.274-.025.06-2.592 6.033-8.772 6.033-.745 0-1.433-.088-2.073-.237l-1.284 1.284c.998.333 2.108.543 3.357.543 7.228 0 10.12-6.724 10.205-6.94.29-.536.29-1.175.035-1.64-.057-.136-.747-1.72-2.216-3.346L18.897 8.99c1.246 1.397 1.844 2.755 1.91 2.903zm-17.616.203c-.035-.065-.035-.138.033-.273.104-.246 2.618-6.033 8.772-6.033.748 0 1.44.088 2.082.24l1.283-1.284c-1-.335-2.113-.546-3.365-.546-7.228 0-10.12 6.723-10.205 6.938-.29.537-.29 1.176-.035 1.642.057.136.748 1.722 2.22 3.35l1.128-1.126c-1.25-1.398-1.848-2.76-1.913-2.908zm-.778 10.242c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.06L21.058 1.882c.293-.294.768-.294 1.06 0s.294.767 0 1.06L2.942 22.12c-.146.145-.338.22-.53.218z"></path>
                                        </g>
                                    </svg>
                                </span>
                            )
                        )}
                    </div>
                );
        }
    }
);

Input.displayName = "Input";
export default Input;
