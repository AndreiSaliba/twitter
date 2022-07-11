import Link from "next/link";

export default function Signup() {
    return (
        <div className="default-style">
            <Link href="/theme">
                <button className="m-1.5 ml-0 rounded-md bg-gray-400 px-3 py-1">
                    Theme Page
                </button>
            </Link>
        </div>
    );
}
