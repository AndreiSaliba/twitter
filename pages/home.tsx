import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
    return (
        <div className="default-style">
            <Link href="/theme" passHref>
                <button className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1">
                    Theme Page
                </button>
            </Link>
        </div>
    );
};

export default Home;
