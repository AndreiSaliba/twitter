import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@context/Auth";

const Home: FC = () => {
    const { session, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <div className="default-style">
            <Link href="/theme" passHref>
                <button className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1">
                    Theme Page
                </button>
            </Link>
            <button
                className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1"
                onClick={() => signOut()}
            >
                Sign Out
            </button>
        </div>
    );
};

export default Home;
