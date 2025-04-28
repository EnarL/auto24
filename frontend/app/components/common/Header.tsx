"use client"
import React from "react";
import { useRouter } from "next/navigation";
import AuthLinks from "@/app/components/auth/AuthLinks";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC<{ className?: string }> = ({ className }) => {
    useRouter();

    return (
        <header className={`bg-gray-200 max-w-custom w-full mx-auto text-black p-4 shadow-md rounded-b-lg ${className}`}>
            <div className="mx-auto flex flex-row items-center justify-between text-sm font-medium">
                <Link href="/" className="flex items-center text-blue-500 hover:text-blue-700 transition duration-300">
                    <Image
                        src="/car-icon.svg"
                        alt="Car Icon"
                        className="w-10 h-10 mr-2"
                        width={24}
                        height={24}
                    />
                </Link>
                <AuthLinks showUserInfo={false} />
            </div>
        </header>
    );
};

export default Header;