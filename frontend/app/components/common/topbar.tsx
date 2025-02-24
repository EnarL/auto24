"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars } from 'react-icons/fa'; // Import a hamburger icon for the sidebar

const Topbar: React.FC = () => {
    const currentPath = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

    const menuItems = [
        { href: '/vali', label: 'Vali automark' },
        { href: '/uued', label: 'Uued sõidukid' },
        { href: '/kuulutused', label: 'Sõidukite kuulutused' },
        { href: '/products/kaubad_ja_varuosad', label: 'Kaubad ja varuosad' },
        { href: '/rent', label: 'Rent' },
        { href: '/firmadjateenused', label: 'Firmad ja teenused' },
        { href: '/uudised', label: 'Uudised' },
        { href: '/forums', label: 'Foorumid' },
        { href: '/financing', label: 'Finantseerimine' },
        { href: '/ostuabi', label: 'Ostuabi' },
        { href: '/users/minu/', label: 'Minu konto' },
    ];

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="text-white text-xs items-center relative flex justify-between">
            {/* Mobile View for the first four items */}
            <div className="md:hidden flex items-center space-x-1">
                {menuItems.slice(0, 4).map((item, index) => (
                    <li key={index} className={`bg-[#FCBA3C] rounded-[.714rem_.714rem_0_0] h-[calc(2*0.857rem+2*0.5rem)] flex justify-center text-center flex-col overflow-hidden px-[0.5em] min-w-[8ch] ${currentPath === item.href ? 'bg-[#06c]' : ''}`}>
                        <Link href={item.href} className="text-white no-underline block text-center text-[10px]">
                            {item.label}
                        </Link>
                    </li>
                ))}
                {/* Mobile View Button */}
                <button
                    className="flex items-center bg-[#FCBA3C] rounded-full p-2 ml-auto"
                    onClick={toggleSidebar}
                    aria-label="Toggle Menu"
                >
                    <FaBars className="text-white" />
                </button>
            </div>

            {/* Sidebar for mobile view */}
            {isSidebarOpen && (
                <div className="absolute top-12 left-0 w-full bg-[#FCBA3C] z-10 p-4">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index} className={`flex justify-center text-center flex-col mb-2`}>
                                <Link href={item.href} className="text-white no-underline block">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-2 text-white" onClick={toggleSidebar} aria-label="Close Menu">
                        Close
                    </button>
                </div>
            )}

            {/* Display all items for larger screens */}
            <ul className="hidden md:flex space-x-0.5">
                {menuItems.map((item, index) => (
                    <li key={index} className={`bg-[#FCBA3C] rounded-[.714rem_.714rem_0_0] h-[calc(2*0.857rem+2*0.5rem)] flex justify-center text-center flex-col overflow-hidden px-[1em] min-w-[10ch] mr-[1px] ${currentPath === item.href ? 'bg-[#06c]' : ''}`}>
                        <Link href={item.href} className="text-white no-underline block text-center">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Topbar;
