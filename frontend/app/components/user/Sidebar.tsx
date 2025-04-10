import React from 'react';
import Link from 'next/link';

interface SidebarProps {
    activeSection: string;
    isMenuVisible: boolean;
    toggleMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, isMenuVisible }) => {
    const getLinkClass = (section: string) =>
        section === activeSection ? 'bg-orange-500 text-white hover:underline ' : 'hover:text-blue-600 hover:underline';

    return (
        <div className={`mt-2 space-y-4 text-[14px] ${isMenuVisible ? 'block' : 'hidden md:block'}`}>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU KUULUTUSED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <Link href="/users/my" className={`block pl-2 mb-1 rounded-[2px] ${getLinkClass('Kõik')}`}>Kõik</Link>
                    <Link href="/users/listings" className={`block pl-2 mb-1 rounded-[2px] ${getLinkClass('Sõidukite kuulutused')}`}>Sõidukite kuulutused</Link>
                    <Link href="/users/kaubad_varuosad" className={`block pl-2 mb-1 rounded-[2px] ${getLinkClass('Kaubad_varuosad')}`}>Kaubad ja varuosad</Link>
                    <Link href="/users/firmad_teenused" className={`block pl-2  mb-1 rounded-[2px] ${getLinkClass('Firmad_teenused')}`}>Firmad ja teenused</Link>
                    <Link href="/users/reklaamid_bannerid" className={`block pl-2  mb-1 rounded-[2px] ${getLinkClass('Reklaamid_bannerid')}`}>Reklaam-bännerid</Link>
                    <Link href="/users/add_listing">
                        <button className="border-2 mt-2 border-gray-100 w-full p-2 flex cursor-pointer hover:bg-gray-200">
                            <p className="mx-auto">LISA KUULUTUS</p>
                        </button>
                    </Link>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MUUD TEENUSED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <Link href="/users/ordered_others" className={`block ${getLinkClass('Ordered_others')}`}>Tellitud muud teenused</Link>
                    <Link href="/users/vpc" className={`block ${getLinkClass('Vpc')}`}>Telli sõidukite hinnapäring</Link>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU TEATED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <Link href="/users/saabunud" className={`block ${getLinkClass('Saabunud')}`}>Saabunud</Link>
                    <Link href="/users/saadetud" className={`block ${getLinkClass('Saadetud')}`}>Saadetud</Link>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU LEMMIKUD</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <Link href="/users/salvestatud_soidukid" className={`block ${getLinkClass('Salvestatud_soidukid')}`}>Salvestatud sõidukid</Link>
                    <Link href="/users/salvestatud_kaubad" className={`block ${getLinkClass('Salvestatud_kaubad')}`}>Salvestatud kaubad ja varuosad</Link>
                    <Link href="/users/salvestatud_otsingud" className={`block ${getLinkClass('Salvestatud_otsingud')}`}>Salvestatud otsingud</Link>
                    <Link href="/users/salvestatud_firmad" className={`block ${getLinkClass('Salvestatud_firmad')}`}>Salvestatud firmad ja teenused</Link>
                    <Link href="/users/minu_oksjonid" className={`block ${getLinkClass('Minu_oksjonid')}`}>Minu oksjonid</Link>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU ARVED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <Link href="/users/arved" className={`block ${getLinkClass('Arved')}`}>Arved</Link>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU KONTO</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <Link href="/users/andmete_kinnitamine" className={`block ${getLinkClass('Andmete_kinnitamine')}`}>Andmete kinnitamine</Link>
                    <Link href="/users/change_data" className={`block ${getLinkClass('Muuda andmeid')}`}>Muuda andmeid</Link>
                    <Link href="/users/change_pw" className={`block ${getLinkClass('Muuda parool')}`}>Muuda parool</Link>
                    <Link href="/users/kasutustingimused" className={`block ${getLinkClass('Kasutustingimused')}`}>Kasutustingimused</Link>
                    <Link href="/users/abi" className={`block ${getLinkClass('Abi')}`}>Abi</Link>
                </div>
            </section>
        </div>
    );
};

export default Sidebar;
