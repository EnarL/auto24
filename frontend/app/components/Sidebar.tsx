// frontend/app/components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <div className="mt-2 space-y-4 text-[12px]">
            <section className="w-[250px] border-2 border-gray-100 rounded-md ">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU KUULUTUSED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="/minu" className="block hover:text-blue-600">Kõik</a>
                    <a href="/vali" className="block hover:text-blue-600">Sõidukite kuulutused</a>
                    <a href="/login" className="block hover:text-blue-600">Kaubad ja varuosad</a>
                    <a href="#" className="block hover:text-blue-600">Firmad ja teenused</a>
                    <a href="#" className="block hover:text-blue-600">Reklaam-bännerid</a>
                    <button
                        className="border-2 mt-2 border-gray-100 w-full p-2 flex cursor-pointer hover:bg-gray-200">
                        <p className="mx-auto">LISA KUULUTUS</p>
                    </button>
                    <a href="#" className=" flex cursor-pointer hover:text-blue-600"><p className="mx-auto">hinnakiri</p></a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MUUD TEENUSED</h2>
                <div className="break-words from-white to-gray-50 opacity-80  bg-gradient-to-t p-2">
                    <a href="#" className="block hover:text-blue-600">Tellitud muud teenused</a>
                    <a href="#" className="block hover:text-blue-600">Telli sõidukite hinnapäring</a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU TEATED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="#" className="block hover:text-blue-600">Saabunud</a>
                    <a href="#" className="block hover:text-blue-600">Saadetud</a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU LEMMIKUD</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="#" className="block hover:text-blue-600">Salvestatud sõidukid</a>
                    <a href="#" className="block hover:text-blue-600">Salvestatud kaubad ja varuosad</a>
                    <a href="#" className="block hover:text-blue-600">Salvestatud otsingud</a>
                    <a href="#" className="block hover:text-blue-600">Salvestatud firmad ja teenused</a>
                    <a href="#" className="block hover:text-blue-600">Minu oksjonid</a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU ARVED</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="#" className="block hover:text-blue-600">Arved</a>
                </div>
            </section>
            <section className="w-[250px] border-2 border-gray-100 rounded-md">
                <h2 className="border-gray-100 border-b-2 p-2 text-[#06c] font-semibold">MINU KONTO</h2>
                <div className="break-words from-white to-gray-50 opacity-80 bg-gradient-to-t p-2">
                    <a href="#" className="block hover:text-blue-600">Andmete kinnitamine</a>
                    <a href="#" className="block hover:text-blue-600">Muuda andmeid</a>
                    <a href="#" className="block hover:text-blue-600">Muuda parool</a>
                    <a href="#" className="block hover:text-blue-600">Kasutustingimused</a>
                    <a href="#" className="block hover:text-blue-600">Abi</a>
                </div>
            </section>
        </div>
    );
};

export default Sidebar;