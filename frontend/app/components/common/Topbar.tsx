"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthUser } from "@/app/context/AuthUserContext";
import AuthLinks from "@/app/components/auth/AuthLinks";

const MenuItem = ({ href, label, isActive, onClick }: { href: string; label: string; isActive: boolean; onClick?: () => void }) => (
    <li className="relative group">
        <Link
            href={href}
            className={`
                flex justify-center items-center px-4 py-2 sm:px-6 sm:py-3
                rounded-lg text-center font-semibold text-sm sm:text-lg
                transition-all duration-300 transform hover:scale-105
                ${isActive ? "bg-green-700 text-white shadow-lg" : "bg-gray-200 text-gray-800"}
            `}
            onClick={onClick}
        >
            {label}
        </Link>
    </li>
);

const Topbar = () => {
    const currentPath = usePathname();
    const router = useRouter();
    const { isLoggedIn } = useAuthUser();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = useMemo(() => [
        { href: "/vali", label: "Vali automark" },
        { href: "/listings", label: "Sõidukite kuulutused" },
    ], []);

    const handleAddListingClick = () => {
        router.push(isLoggedIn ? "/users/add_listing" : "/login");
    };

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    return (
        <nav className="relative w-full max-w-screen-2xl mx-auto bg-gray-100 shadow-md">
            <div className="flex items-center justify-between px-6 py-4">
                <ul className="flex space-x-4 sm:space-x-6">
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            isActive={currentPath === item.href}
                        />
                    ))}
                    <li className="relative group">
                        <button
                            onClick={handleAddListingClick}
                            className="flex justify-center items-center px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-center font-semibold text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 bg-green-600 text-white hover:bg-green-700"
                        >
                            Lisa kuulutus
                        </button>
                    </li>
                </ul>
                <Link href="/users/my" className="hidden md:flex relative group">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-800 group-hover:text-green-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                            />
                        </svg>
                    </div>
                </Link>
                <button
                    className="relative group ml-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 md:hidden"
                    onClick={toggleSidebar}
                    aria-label="More options"
                >
                    <div className="flex flex-col space-y-1 items-center justify-center">
                        <span className="block w-5 h-0.5 bg-gray-600 rounded"></span>
                        <span className="block w-5 h-0.5 bg-gray-600 rounded"></span>
                        <span className="block w-5 h-0.5 bg-gray-600 rounded"></span>
                    </div>
                </button>
            </div>

            {isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40 transition-opacity duration-300"
                        onClick={toggleSidebar}
                        aria-hidden="true"
                    />
                    <div className="fixed top-0 right-0 h-full w-64 bg-gray-100 z-50 shadow-lg transform transition-transform duration-300">
                        <div className="flex justify-end items-center p-4 border-b border-gray-300">
                            <button
                                onClick={toggleSidebar}
                                aria-label="Close Menu"
                                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <ul className="py-3">
                            {menuItems.map((item) => (
                                <MenuItem
                                    key={item.href}
                                    href={item.href}
                                    label={item.label}
                                    isActive={currentPath === item.href}
                                    onClick={toggleSidebar}
                                />
                            ))}
                            <li className="mx-3 my-2 overflow-hidden rounded-md">
                                <Link
                                    href="/users/my"
                                    className="flex items-center px-5 py-3 rounded-md text-gray-800 text-lg font-medium transition-all duration-200 transform hover:scale-105 hover:bg-green-600 hover:text-white"
                                    onClick={toggleSidebar}
                                >
                                    Minu konto
                                </Link>
                            </li>
                            <li className="mx-3 my-2 overflow-hidden rounded-md">
                                <div className="px-5 py-3">
                                    <AuthLinks onClick={toggleSidebar} />
                                </div>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </nav>
    );
};

export default React.memo(Topbar);