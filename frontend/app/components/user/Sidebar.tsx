import React from 'react';
import Link from 'next/link';

interface SidebarProps {
    activeSection: string;
    isMenuVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, isMenuVisible }) => {
    const getLinkClass = (section: string) =>
        section === activeSection
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100';

    return (
        <div className={`mt-4 space-y-6 text-[16px] ${isMenuVisible ? 'block' : 'hidden md:block'}`}>
            <section className="w-[250px] border border-gray-300 rounded-lg shadow-md bg-white">
                <h2 className="border-b border-gray-300 p-4 text-blue-800 font-bold text-lg">MINU KUULUTUSED</h2>
                <div className="p-4 space-y-3">
                    <Link href="/users/my" className={`block px-4 py-3 rounded-md ${getLinkClass('Kõik')}`}>Kõik</Link>
                    <Link href="/users/listings" className={`block px-4 py-3 rounded-md ${getLinkClass('Sõidukite kuulutused')}`}>Sõidukite kuulutused</Link>
                    <Link href="/users/add_listing">
                        <button className="w-full px-4 py-3 rounded-md bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 shadow-md">
                            LISA KUULUTUS
                        </button>
                    </Link>
                </div>
            </section>
            <section className="w-[250px] border border-gray-300 rounded-lg shadow-md bg-white">
                <h2 className="border-b border-gray-300 p-4 text-blue-800 font-bold text-lg">MINU KONTO</h2>
                <div className="p-4 space-y-3">
                    <Link href="/users/change_data" className={`block px-4 py-3 rounded-md ${getLinkClass('Muuda andmeid')}`}>Muuda andmeid</Link>
                    <Link href="/users/change_pw" className={`block px-4 py-3 rounded-md ${getLinkClass('Muuda parool')}`}>Muuda parool</Link>
                </div>
            </section>
        </div>
    );
};

export default Sidebar;