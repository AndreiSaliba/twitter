import Link from "next/link";

export default function Login() {
    return (
        <div className="default-style">
            <Link href="/theme">
                <button className="rounded-md px-3 py-1 m-1.5 ml-0 bg-gray-400">
                    Theme Page
                </button>
            </Link>
        </div>
    );
}
