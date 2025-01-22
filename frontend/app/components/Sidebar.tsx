// frontend/app/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
    activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
    const getLinkClass = (section: string) =>
        section === activeSection ? 'bg-orange-500 text-white hover:underline ' : 'hover:text-blue-600 hover:underline';

    return (
        <div className="mt-2 space-y-4 text-[14px]">
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU KUULUTUSED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="minu" className={`block pl-2 mb-1 rounded-[2px] ${getLinkClass('Kõik')}`}>Kõik</a>
                    <a href="kuulutused" className={`block pl-2 mb-1 rounded-[2px] ${getLinkClass('Sõidukite kuulutused')}`}>Sõidukite kuulutused</a>
                    <a href="kaubad_varuosad" className={`block pl-2 mb-1 rounded-[2px] ${getLinkClass('Kaubad ja varuosad')}`}>Kaubad ja varuosad</a>
                    <a href="firmad_teenused" className={`block pl-2  mb-1 rounded-[2px] ${getLinkClass('Firmad ja teenused')}`}>Firmad ja teenused</a>
                    <a href="reklaamid_bannerid" className={`block pl-2  mb-1 rounded-[2px] ${getLinkClass('Reklaam-bännerid')}`}>Reklaam-bännerid</a>
                    <button
                        className="border-2 mt-2 border-gray-100 w-full p-2 flex cursor-pointer hover:bg-gray-200">
                        <p className="mx-auto">LISA KUULUTUS</p>
                    </button>
                    <a href="#" className="flex cursor-pointer hover:text-blue-600"><p className="mx-auto">hinnakiri</p></a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MUUD TEENUSED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="ordered_others" className={`block ${getLinkClass('Tellitud muud teenused')}`}>Tellitud muud teenused</a>
                    <a href="vpc" className={`block ${getLinkClass('Vpc')}`}>Telli sõidukite hinnapäring</a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU TEATED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="#" className={`block ${getLinkClass('Saabunud')}`}>Saabunud</a>
                    <a href="#" className={`block ${getLinkClass('Saadetud')}`}>Saadetud</a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU LEMMIKUD</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="#" className={`block ${getLinkClass('Salvestatud sõidukid')}`}>Salvestatud sõidukid</a>
                    <a href="#" className={`block ${getLinkClass('Salvestatud kaubad ja varuosad')}`}>Salvestatud kaubad ja varuosad</a>
                    <a href="#" className={`block ${getLinkClass('Salvestatud otsingud')}`}>Salvestatud otsingud</a>
                    <a href="#" className={`block ${getLinkClass('Salvestatud firmad ja teenused')}`}>Salvestatud firmad ja teenused</a>
                    <a href="#" className={`block ${getLinkClass('Minu oksjonid')}`}>Minu oksjonid</a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU ARVED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="#" className={`block ${getLinkClass('Arved')}`}>Arved</a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU KONTO</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="#" className={`block ${getLinkClass('Andmete kinnitamine')}`}>Andmete kinnitamine</a>
                    <a href="#" className={`block ${getLinkClass('Muuda andmeid')}`}>Muuda andmeid</a>
                    <a href="change_pw" className={`block ${getLinkClass('Muuda parool')}`}>Muuda parool</a>
                    <a href="#" className={`block ${getLinkClass('Kasutustingimused')}`}>Kasutustingimused</a>
                    <a href="#" className={`block ${getLinkClass('Abi')}`}>Abi</a>
                </div>
            </section>
        </div>
    );
};

export default Sidebar;