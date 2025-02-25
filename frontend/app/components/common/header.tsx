
"use client"
import React from "react";
import { useRouter } from "next/navigation";
import AuthLinks from "@/app/components/auth/AuthLinks";

const Header: React.FC<{ className?: string }> = ({ className }) => {
    useRouter();

    return (
        <header className={`bg-gray-100 p-2 opacity-80 mb-1 ${className}`}>
            <div className="mx-auto flex flex-row items-center justify-between text-[12px] w-full max-w-custom">
                <AuthLinks showUserInfo={true}/>
            </div>
        </header>
    );
};

export default Header;
