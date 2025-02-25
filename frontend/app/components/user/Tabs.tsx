import React from "react";
import Link from "next/link";

interface TabsProps {
    activeTab: string;
}

const Tabs: React.FC<TabsProps> = ({ activeTab }) => {
    const getLinkClass = (tab: string) =>
        tab === activeTab ? "bg-white text-black border-b-1 border-blue-500" : "hover:text-[#06c] bg-gray-200";

    return (
        <div className="mt-2 ml-[10px] w-full md:w-[740px] from-white to-gray-200 opacity-80 bg-gradient-to-b border-gray-100 rounded-md flex flex-col relative">
            <div className="absolute top-0 left-2">
                <p className="text-sm font-semibold">Minu kuulutused</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-6 md:hidden">
                <Link href="minu" className={`p-2 text-center ${getLinkClass("Kõik")}`}>
                    Kõik
                </Link>
                <Link href="kuulutused" className={`p-2 text-center ${getLinkClass("Sõidukite kuulutused")}`}>
                    Sõidukite kuulutused
                </Link>
                <Link href="kaubad_varuosad" className={`p-2 text-center ${getLinkClass("Kaubad_varuosad")}`}>
                    Kaubad ja varuosad
                </Link>
                <Link href="firmad_teenused" className={`p-2 text-center ${getLinkClass("Firmad_teenused")}`}>
                    Firmad ja teenused
                </Link>
                <Link href="reklaamid_bannerid" className={`p-2 text-center ${getLinkClass("Reklaamid_bannerid")}`}>
                    Reklaam-bännerid
                </Link>
                <Link href="ordered_others" className={`p-2 text-center ${getLinkClass("Ordered_others")}`}>
                    Muud teenused
                </Link>
            </div>

            <div className="hidden md:flex text-[14px] h-[86px] items-end justify-end">
                <Link href="minu" className={`w-[86px] h-full text-center flex items-end justify-center ${getLinkClass("Kõik")}`}>
                    Kõik
                </Link>
                <Link href="kuulutused" className={`w-[86px] h-full text-center flex items-end justify-center ${getLinkClass("Sõidukite kuulutused")}`}>
                    Sõidukite kuulutused
                </Link>
                <Link href="kaubad_varuosad" className={`w-[86px] h-full text-center flex items-end justify-center ${getLinkClass("Kaubad_varuosad")}`}>
                    Kaubad ja varuosad
                </Link>
                <Link href="firmad_teenused" className={`w-[86px] h-full text-center flex items-end justify-center ${getLinkClass("Firmad_teenused")}`}>
                    Firmad ja teenused
                </Link>
                <Link href="reklaamid_bannerid" className={`w-[86px] h-full text-center flex items-end justify-center ${getLinkClass("Reklaamid_bannerid")}`}>
                    Reklaam-bännerid
                </Link>
                <Link href="ordered_others" className={`w-[86px] h-full text-center flex items-end justify-center ${getLinkClass("Ordered_others")}`}>
                    Muud teenused
                </Link>
            </div>
        </div>
    );
};

export default Tabs;
