import Sidebar from "@components/Sidebar";
import { FC } from "react";

const Notifications: FC = () => {
    return (
        <div className="default-style flex flex-row justify-center">
            <Sidebar />
            <div className="w-[990px]">
                <div className="min-h-screen w-[600px] border-x p-3 light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]"></div>
                <div className="ml-7 w-[350px]"></div>
            </div>
        </div>
    );
};

export default Notifications;
