"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/user/Sidebar";
import Tabs from "@/app/components/user/Tabs";
import { useAuthUser } from "@/app/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const UserLayout: React.FC<{ activeTab: string; children: React.ReactNode }> = ({ activeTab, children }) => {
    const { isLoggedIn } = useAuthUser();
    const router = useRouter();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    React.useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    return (
        <div className="flex">
            <Sidebar activeSection={activeTab} isMenuVisible={isMenuVisible} />
            <div className={`flex-grow transition-all duration-300 ${isMenuVisible ? "ml-0" : "ml-0"}`}>
                <div className="flex items-center mb-2">
                    <button
                        className="border border-gray-500 border-1 px-2 py-1 mt-2 flex items-center md:hidden"
                        onClick={toggleMenu}
                    >
                        <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <div className="flex flex-col w-full">

                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserLayout;
