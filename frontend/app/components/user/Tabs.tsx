import React from "react";
import Link from "next/link";

interface TabsProps {
    activeTab: string;
}

const Tabs: React.FC<TabsProps> = ({ activeTab }) => {
    const getLinkClass = (tab: string) =>
        tab === activeTab
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-md"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-100";

    return (
        <div className="mt-4 w-full md:w-[740px] md:ml-[10px] bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200">
                <p className="text-lg font-semibold text-gray-800">Minu kuulutused</p>
            </div>
            <div className="flex justify-around p-4">
                <Link
                    href="/users/my"
                    className={`px-6 py-3 rounded-lg text-center transition-all duration-300 ${getLinkClass("Kõik")}`}
                >
                    Kõik
                </Link>
                <Link
                    href="/users/listings"
                    className={`px-6 py-3 rounded-lg text-center transition-all duration-300 ${getLinkClass("Sõidukite kuulutused")}`}
                >
                    Sõidukite kuulutused
                </Link>
            </div>
        </div>
    );
};

export default Tabs;