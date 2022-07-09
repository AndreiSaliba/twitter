import Link from "next/link";
import { useTheme } from "../context/Theme";

export default function Theme() {
    const { changeTheme } = useTheme();
    return (
        <div className="default-style">
            <div>
                Hello <span className="text-accent">#twitter</span>
            </div>
            <div>
                <button
                    className="bg-gray-400 rounded-md px-3 py-1 m-1.5 ml-0"
                    onClick={() => changeTheme("light-theme")}
                >
                    Default
                </button>
                <button
                    className="bg-gray-400 rounded-md px-3 py-1 m-1.5 ml-0"
                    onClick={() => changeTheme("dim-theme")}
                >
                    Dim
                </button>
                <button
                    className="bg-gray-400 rounded-md px-3 py-1 m-1.5 ml-0"
                    onClick={() => changeTheme("dark-theme")}
                >
                    Lights Out
                </button>
            </div>
            <div>
                <button
                    className="rounded-md px-3 py-1 m-1.5 ml-0 bg-blue"
                    onClick={() => changeTheme("blue-accent")}
                >
                    Blue
                </button>
                <button
                    className="rounded-md px-3 py-1 m-1.5 ml-0 bg-yellow"
                    onClick={() => changeTheme("yellow-accent")}
                >
                    Yellow
                </button>
                <button
                    className="rounded-md px-3 py-1 m-1.5 ml-0 bg-pink"
                    onClick={() => changeTheme("pink-accent")}
                >
                    Pink
                </button>
                <button
                    className="rounded-md px-3 py-1 m-1.5 ml-0 bg-purple"
                    onClick={() => changeTheme("purple-accent")}
                >
                    Purple
                </button>

                <button
                    className="rounded-md px-3 py-1 m-1.5 ml-0 bg-orange"
                    onClick={() => changeTheme("orange-accent")}
                >
                    Orange
                </button>

                <button
                    className="rounded-md px-3 py-1 m-1.5 ml-0 bg-green"
                    onClick={() => changeTheme("green-accent")}
                >
                    Green
                </button>
            </div>
            <div>
                <Link href="/login">
                    <button className="rounded-md px-3 py-1 m-1.5 ml-0 bg-gray-400">
                        Login Page
                    </button>
                </Link>
            </div>
        </div>
    );
}
