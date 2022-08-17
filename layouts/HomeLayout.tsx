import { ElementType, Suspense } from "react";
import Sidebar from "@components/Sidebar";

const HomeLayout: ElementType = ({ children }) => {
    return (
        <div className="default-style flex flex-row sm:justify-center">
            <Sidebar />
            <Suspense>
                <div className="w-full max-w-[990px]">
                    <div className="min-h-screen w-full max-w-[600px] border-x light:border-[#eff3f4] dim:border-[#38444d] dark:border-[#2f3336]">
                        {children}
                    </div>
                    <div className="ml-7 w-full max-w-[350px]"></div>
                </div>
            </Suspense>
        </div>
    );
};

export default HomeLayout;
