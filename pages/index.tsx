import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@context/Auth";
import Button from "@components/Button";

const Landing: FC = () => {
    const { session, logInWithProvider } = useAuth();
    const router = useRouter();

    useEffect(() => {
        session && router.push("/home");
    }, [session, router]);

    return (
        <div className="default-style flex min-h-screen min-w-full justify-center">
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
                    variant="rounded"
                    color="white"
                    authProvider="Google"
                    className="mb-5"
                    onClick={() => logInWithProvider("google")}
                >
                    Sign up with Google
                </Button>

                <Button
                    variant="rounded"
                    color="white"
                    authProvider="Github"
                    className="mb-2"
                    onClick={() => logInWithProvider("github")}
                >
                    Sign up with Github
                </Button>

                <div className="relative mb-2 flex w-80 items-center">
                    <div className="flex-grow border-t border-[#2f3336] light:border-[#cfd9de]"></div>
                    <span className="mx-4 flex-shrink">or</span>
                    <div className="flex-grow border-t border-[#2f3336] light:border-[#cfd9de]"></div>
                </div>

                <Link href="/signup">
                    <a>
                        <Button
                            variant="rounded"
                            color="blue"
                            className="mb-16"
                        >
                            Sign up with email
                        </Button>
                    </a>
                </Link>

                <span className="mb-3 w-80 text-lg font-semibold">
                    Already have an account?
                </span>

                <Link href="/login">
                    <a>
                        <Button
                            variant="rounded"
                            color="transparent-blue"
                            className="mb-16"
                        >
                            Sign in
                        </Button>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Landing;
