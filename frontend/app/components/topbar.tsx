"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Topbar: React.FC = () => {
    const currentPath = usePathname();

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
        { href: '/minu', label: 'Minu konto' },
    ];

    return (
        <nav className="text-white text-xs items-center">
            <ul className="flex space-x-0.5 header-menu">
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