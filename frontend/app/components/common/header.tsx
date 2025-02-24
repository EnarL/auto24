"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/app/context/AuthUserContext";
import Link from "next/link";

const Header: React.FC<{ className?: string }> = ({ className }) => {
    const router = useRouter();
    const {
        isLoggedIn,
        username,
        firstname,
        lastname,
        setIsLoggedIn,
        setUsername,
        setFirstname,
        setLastname,
    } = useAuthUser();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                credentials: "include", // Include cookies in the request
            });

            if (response.ok) {
                setIsLoggedIn(false);
                setUsername("");
                setFirstname("");
                setLastname("");
                router.push("/login");
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    return (
        <header className={`bg-gray-100 p-2 opacity-80 mb-1 ${className}`}>
            <div className="mx-auto flex flex-row items-center justify-between text-[12px] w-full max-w-custom">
                {isLoggedIn ? (
                    <div className="flex flex-row items-center space-x-2">
                        <Link href="/users/change_data" className="hover:text-blue-600">
                            {firstname} {lastname} / {username}
                        </Link>
                        <a href="#" onClick={handleLogout} className="hover:text-blue-600">
                            Logi välja
                        </a>
                    </div>
                ) : (
                    <a href="/login" className="hover:text-blue-600">
                        Logi sisse
                    </a>
                )}
            </div>
        </header>
    );
};

export default Header;