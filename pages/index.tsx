import Link from "next/link";
import Button from "@components/Button";

export default function Home() {
    return (
        <div className="default-style flex h-screen w-screen justify-center">
            <div className="mt-20 flex min-w-[350px] flex-col items-center">
                <span className="mb-8 flex h-fit w-fit flex-col items-center justify-center">
                    <svg
                        viewBox="0 0 24 24"
                        className="mb-8 w-9 fill-white light:fill-[#1d9bf0]"
                    >
                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                    </svg>
                    <span className="align-top text-4xl font-black">
                        Join Twitter today.
                    </span>
                </span>

                <Button
                    style="rounded"
                    color="white"
                    text="Sign up with Google"
                    authProvider="Google"
                    className="mb-5"
                />

                <Button
                    style="rounded"
                    color="white"
                    text="Sign up with Github"
                    authProvider="Github"
                    className="mb-2"
                />

                <div className="relative mb-2 flex w-80 items-center">
                    <div className="flex-grow border-t border-[#2f3336] light:border-[#cfd9de]"></div>
                    <span className="mx-4 flex-shrink">or</span>
                    <div className="flex-grow border-t border-[#2f3336] light:border-[#cfd9de]"></div>
                </div>

                <Link href="/signup">
                    <a>
                        <Button
                            style="rounded"
                            color="blue"
                            text="Sign up with email"
                            className="mb-16"
                        />
                    </a>
                </Link>

                <span className="mb-3 w-80 text-lg font-semibold">
                    Already have an account?
                </span>

                <Link href="/login">
                    <a>
                        <Button
                            text="Sign in"
                            style="rounded"
                            color="transparent"
                            textColor="blue"
                            className="mb-16"
                        />
                    </a>
                </Link>
            </div>
        </div>
    );
}

/*
<button className="mb-5 w-80 rounded-full border bg-white p-1.5 text-black hover:bg-[hsl(0,0%,95%)] light:border-[#dadce0]">
    <span className="flex flex-row items-center justify-center font-semibold">
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
        <span>Sign up with Google</span>
    </span>
</button>

<button className="mb-2 w-80 rounded-full border bg-white p-1.5 text-black hover:bg-[hsl(0,0%,95%)] light:border-[#dadce0]">
<span className="flex flex-row items-center justify-center font-semibold">
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mt-0.5 mr-1.5 w-5"
    >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
    <span>Sign up with Github</span>
</span>
</button>

<button className="mb-16 w-80 rounded-full bg-blue p-1.5 hover:bg-[#1a8cd8]">
    <span className="font-semibold light:text-white">
        Sign up with email
    </span>
</button>

<button className="w-80 rounded-full border border-[#536471] p-1.5  text-blue hover:bg-[#031018] light:border-[#dadce0] light:hover:bg-[#e8f5fd]">
    <span className="font-semibold">Sign in</span>
</button>
*/
