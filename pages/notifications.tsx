import { useEffect } from "react";
import Header from "@components/Header";
import { useAuth } from "@context/Auth";
import { useRouter } from "next/router";
import HomeLayout from "@layouts/HomeLayout";

const Notifications = () => {
    const { session } = useAuth();
    const router = useRouter();

    useEffect(() => {
        !session && router.push("/");
    }, [session, router]);

    return (
        <>
            <Header variant="notifications" />
        </>
    );
};

Notifications.PageLayout = HomeLayout;

export default Notifications;
