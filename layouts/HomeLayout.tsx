import { Suspense } from "react";
import Sidebar from "@components/Sidebar";
import EditProfileModal from "@components/modals/EditProfileModal";

const HomeLayout = ({ children }) => {
    return (
        <>
            <div className="default-style flex flex-row sm:justify-center">
                <Sidebar />
                <Suspense>
                    <div className="flex w-full max-w-[990px] flex-row">
                        <div className="min-h-screen w-full max-w-[600px] border-x light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
                            {children}
                        </div>
                        <div className="ml-7 w-full max-w-[350px] xl:hidden"></div>
                    </div>
                </Suspense>
            </div>
            <EditProfileModal />
        </>
    );
};

export default HomeLayout;
