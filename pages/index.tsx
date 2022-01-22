import { useTheme } from "../context/Theme";

export default function Home() {
    const { changeTheme } = useTheme();
    return (
        <div className=" w-screen h-screen p-4 light:bg-[#fff] dim:bg-[#15202b] dark:bg-[#000] light:text-black dim:text-white dark:text-white">
            <div>
                Hello <span className="text-accent">#twitter</span>
            </div>
            <div>
                <button
                    className="bg-gray-400 rounded-md px-3 py-1 m-3 ml-0"
                    onClick={() => changeTheme("light-theme")}
                >
                    Default
                </button>
                <button
                    className="bg-gray-400 rounded-md px-3 py-1 m-3"
                    onClick={() => changeTheme("dim-theme")}
                >
                    Dim
                </button>
                <button
                    className="bg-gray-400 rounded-md px-3 py-1 m-3"
                    onClick={() => changeTheme("dark-theme")}
                >
                    Lights Out
                </button>
            </div>
            <div>
                <button
                    className="rounded-md px-3 py-1 m-3 ml-0 bg-blue"
                    onClick={() => changeTheme("blue-accent")}
                >
                    Blue
                </button>
                <button
                    className="rounded-md px-3 py-1 m-3 bg-yellow"
                    onClick={() => changeTheme("yellow-accent")}
                >
                    Yellow
                </button>
                <button
                    className="rounded-md px-3 py-1 m-3 bg-pink"
                    onClick={() => changeTheme("pink-accent")}
                >
                    Pink
                </button>
                <button
                    className="rounded-md px-3 py-1 m-3 bg-purple"
                    onClick={() => changeTheme("purple-accent")}
                >
                    Purple
                </button>

                <button
                    className="rounded-md px-3 py-1 m-3 bg-orange"
                    onClick={() => changeTheme("orange-accent")}
                >
                    Orange
                </button>

                <button
                    className=" rounded-md px-3 py-1 m-3 bg-green"
                    onClick={() => changeTheme("green-accent")}
                >
                    Green
                </button>
            </div>
        </div>
    );
}
