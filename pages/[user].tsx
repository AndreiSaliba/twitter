import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@context/Auth";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import { UserProfile } from "@utils/types";
import { useDatabase } from "@context/Database";

const User: FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>();
    const { getUser } = useDatabase();
    const { session } = useAuth();
    const router = useRouter();
    const { user } = router.query;

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    useEffect(() => {
        if (user && session) {
            if (
                session?.user?.user_metadata?.userProfile.username.toLowerCase() ===
                (user as string).toLowerCase()
            ) {
                setUserProfile(session?.user?.user_metadata?.userProfile);
            } else {
                getUser(user).then((data) => {
                    data ? setUserProfile(data) : router.push("/home");
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, session]);

    return (
        <div className="default-style flex flex-row justify-center">
            <Sidebar />
            <div className="w-full max-w-[990px]">
                <div className="min-h-screen w-full max-w-[600px] border-x light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
                    {userProfile && (
                        <Header
                            type="profile"
                            name={userProfile?.name}
                            tweetCount={userProfile?.statuses_count}
                        />
                    )}
                </div>
                <div className="ml-7 w-full max-w-[350px]"></div>
            </div>
        </div>
    );
};

export default User;
