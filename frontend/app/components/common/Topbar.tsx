"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthLinks from "@/app/components/auth/AuthLinks";

const Topbar: React.FC = () => {
    useRouter();
    const currentPath = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [visibleItems, setVisibleItems] = useState(4);

    const menuItems = [
        { href: "/vali", label: "Vali automark" },
        { href: "/uued", label: "Uued sõidukid" },
        { href: "/listings", label: "Sõidukite kuulutused" },
        { href: "/products/kaubad_ja_varuosad", label: "Kaubad ja varuosad" },
        { href: "/rent", label: "Rent" },
        { href: "/firmadjateenused", label: "Firmad ja teenused" },
        { href: "/uudised", label: "Uudised" },
        { href: "/forums", label: "Foorumid" },
        { href: "/financing", label: "Finantseerimine" },
        { href: "/ostuabi", label: "Ostuabi" },
        { href: "/users/my/", label: "Minu konto" },
    ];

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let newVisibleItems;

            if (width < 640) {
                newVisibleItems = 4;
            } else if (width < 768) {
                newVisibleItems = 5;
            } else if (width < 1024) {
                newVisibleItems = 7;
            } else if (width < 1280) {
                newVisibleItems = 9;
            } else {
                newVisibleItems = menuItems.length;
            }

            setVisibleItems(newVisibleItems);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [menuItems.length]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleAuthLinkClick = () => {
        setIsSidebarOpen(false);
    };

    return (
        <nav className="text-white relative w-full max-w-screen-2xl mx-auto">
            <div className="flex items-center justify-between">
                <ul className="flex space-x-0.5">
                    {menuItems.slice(0, visibleItems).map((item, index) => (
                        <li
                            key={index}
                            className={`bg-[#FCBA3C] rounded-tl-[.714rem] rounded-tr-[.714rem] h-10 w-auto max-w-[94px] flex justify-center items-center overflow-hidden px-3 transition-all duration-200 hover:brightness-110 ${currentPath === item.href ? "bg-[#06c]" : ""}`}
                        >
                            <Link
                                href={item.href}
                                className="text-white no-underline block text-xs leading-tight text-center"
                            >
                                {item.label.replace(" ", "\n")}
                            </Link>
                        </li>
                    ))}
                </ul>
                {visibleItems < menuItems.length && (
                    <button
                        className="ml-2 bg-[#FCBA3C] p-3 rounded-t shadow-md hover:brightness-110 transition-all duration-300 flex items-center justify-center"
                        onClick={toggleSidebar}
                        aria-label="Toggle Menu"
                    >
                        <FaBars className="text-white text-lg" />
                    </button>
                )}
            </div>
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-[#FCBA3C] z-50 shadow-lg transition-transform transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-3 border-b border-yellow-400">
                    <span className="font-medium"></span>
                    <button
                        onClick={toggleSidebar}
                        aria-label="Close Menu"
                        className="text-white hover:text-gray-200"
                    >
                        <FaTimes />
                    </button>
                </div>
                <ul className="py-2">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`hover:bg-yellow-500 transition-colors duration-200 ${currentPath === item.href ? "bg-[#06c]" : ""}`}
                        >
                            <Link
                                href={item.href}
                                className="text-white no-underline block px-4 py-2 text-sm text-center"
                                onClick={toggleSidebar}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li className="flex justify-center items-center h-full hover:bg-yellow-500 transition-colors px-4 py-2 text-sm duration-200">
                        <AuthLinks onClick={handleAuthLinkClick} />
                    </li>
                </ul>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}
        </nav>
    );
};

export default Topbar;
