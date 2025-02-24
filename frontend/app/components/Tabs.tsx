import React from 'react';
import Link from 'next/link';  // Import Link from Next.js

interface TabsProps {
    activeTab: string;
}

const Tabs: React.FC<TabsProps> = ({ activeTab }) => {
    const getLinkClass = (tab: string) =>
        tab === activeTab ? 'bg-white text-black' : 'hover:text-[#06c] bg-gray-200';

    return (
        <div className="mt-2 ml-[10px] w-[740px] h-[85px] from-white to-gray-200 opacity-80 bg-gradient-to-b border-gray-100 rounded-md flex justify-end items-end relative">
            <div className="absolute top-0 left-0 p-2">
                <p className="">Minu kuulutused</p>
            </div>
            <div className="flex text-[14px] h-full items-end">
                <Link href="minu" className={`w-[86px] h-full text-center cursor-pointer flex items-end justify-center ${getLinkClass('Kõik')}`}>
                    Kõik
                </Link>
                <Link href="kuulutused" className={`w-[86px] text-center h-full cursor-pointer flex items-end justify-center ${getLinkClass('Sõidukite kuulutused')}`}>
                    Sõidukite kuulutused
                </Link>
                <Link href="kaubad_varuosad" className={`w-[86px] text-center h-full cursor-pointer flex items-end justify-center ${getLinkClass('Kaubad ja varuosad')}`}>
                    Kaubad ja varuosad
                </Link>
                <Link href="firmad_teenused" className={`w-[86px] text-center h-full cursor-pointer flex items-end justify-center ${getLinkClass('Firmad ja teenused')}`}>
                    Firmad ja teenused
                </Link>
                <Link href="reklaamid_bannerid" className={`w-[86px] text-center h-full cursor-pointer flex items-end justify-center ${getLinkClass('Reklaam-bännerid')}`}>
                    Reklaam-bännerid
                </Link>
                <Link href="ordered_others" className={`w-[86px] text-center h-full cursor-pointer flex items-end justify-center ${getLinkClass('Muud teenused')}`}>
                    Muud teenused
                </Link>
            </div>
        </div>
    );
};

export default Tabs;
