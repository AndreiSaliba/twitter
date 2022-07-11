import Link from "next/link";
import { useTheme } from "@context/Theme";

export default function Theme() {
    const { changeTheme } = useTheme();
    return (
        <div className="default-style">
            <div>
                Hello <span className="text-accent">#twitter</span>
            </div>
            <div>
                <button
                    className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1"
                    onClick={() => changeTheme("light-theme")}
                >
                    Default
                </button>
                <button
                    className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1"
                    onClick={() => changeTheme("dim-theme")}
                >
                    Dim
                </button>
                <button
                    className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1"
                    onClick={() => changeTheme("dark-theme")}
                >
                    Lights Out
                </button>
            </div>
            <div>
                <button
                    className="m-1.5 ml-0 rounded-md bg-blue px-3 py-1"
                    onClick={() => changeTheme("blue-accent")}
                >
                    Blue
                </button>
                <button
                    className="m-1.5 ml-0 rounded-md bg-yellow px-3 py-1"
                    onClick={() => changeTheme("yellow-accent")}
                >
                    Yellow
                </button>
                <button
                    className="m-1.5 ml-0 rounded-md bg-pink px-3 py-1"
                    onClick={() => changeTheme("pink-accent")}
                >
                    Pink
                </button>
                <button
                    className="m-1.5 ml-0 rounded-md bg-purple px-3 py-1"
                    onClick={() => changeTheme("purple-accent")}
                >
                    Purple
                </button>

                <button
                    className="m-1.5 ml-0 rounded-md bg-orange px-3 py-1"
                    onClick={() => changeTheme("orange-accent")}
                >
                    Orange
                </button>

                <button
                    className="m-1.5 ml-0 rounded-md bg-green px-3 py-1"
                    onClick={() => changeTheme("green-accent")}
                >
                    Green
                </button>
            </div>
            <div>
                <Link href="/" passHref>
                    <button className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1">
                        Landing Page
                    </button>
                </Link>
            </div>
        </div>
    );
}
