"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MenuBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (

            <div className="relative inline-block text">
                <h1 className="text-[18px] mb-2  font-sans w-[250px] opacity-60">SÕIDUKIKUULUTUSED</h1>
                <div className="flex items-center">
                    <button
                        type="button"
                        className=" inline-flex justify-start w-[250px] shadow-sm px-2 py-1 bg-gray-500 font-medium text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <FontAwesomeIcon icon={faSearch} className="ml-0 size-5 text-white pr-4"/>
                        Kõik liigid
                    </button>
                </div>

                {isOpen && (
                    <div
                        className="origin-top-left absolute left-0 mt-2 w-[250px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Sõiduauto ja maastur</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Kaubik</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Buss</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Veoauto</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Mototehnika</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Veesõiduk</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Võistlussõiduk</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Haagis</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Haagissuvila ja autoelamu</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Eritehnika</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                               role="menuitem">Muu</a>
                        </div>
                    </div>
                )}

                <form className="w-[250px] text-s text-black bg-[#f4f4f4] p-4">
                    <div className="mb-1.5 border-1 border-gray-500">
                        <input type="number" placeholder="Keretüüp"
                               className=" block text-[12px] w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div className="mb-1.5">
                        <input type="text" placeholder="Mark"
                               className=" text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div className="mb-1.5">
                        <input type="text" placeholder="Mudel"
                               className=" text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div className="mb-1.5">
                        <input type="text" placeholder="Muu mudel või täpsustus"
                               className=" text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div className="mb-1.5">
                        <label className="block text-gray-700 text-[12px]">Aasta</label>
                        <div className="grid grid-cols-2 gap-2 "><input type="text" placeholder="alates"
                                                                        className=" text-[14px] block w-full border-gray-300 border-[1px] px-2 focus:border-blue-600 focus:outline-none"/>
                            <input type="text" placeholder="kuni"
                                   className=" text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                        </div>

                    </div>
                    <div className="mb-1.5">
                        <label className="block text-[12px] text-gray-700">Hind</label>
                        <div className="grid grid-cols-2 gap-2 "><input type="text" placeholder="alates"
                                                                        className=" text-[14px] block w-full border-gray-300 border-[1px] px-2 focus:border-blue-600 focus:outline-none"/>
                            <input type="text" placeholder="kuni"
                                   className=" text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                        </div>
                    </div>
                    <div className="mb-1.5">
                        <label className="block text-[12px] text-gray-700">Võimsus (kW)</label>
                        <div className="grid grid-cols-2 gap-2 "><input type="text" placeholder="alates"
                                                                        className="mt-1 text-[14px] block w-full border-gray-300 border-[1px] px-2 focus:border-blue-600 focus:outline-none"/>
                            <input type="text" placeholder="kuni"
                                   className="mt-1 text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                        </div>
                    </div>
                    <div className="mb-1.5">
                        <label className="block text-[12px] text-gray-700">Läbisõidumõõdiku näit (km)</label>
                        <div className="grid grid-cols-2 gap-2 "><input type="text" placeholder="alates"
                                                                        className="mt text-[14px] block w-full border-gray-300 border-[1px] px-2 focus:border-blue-600 focus:outline-none"/>
                            <input type="text" placeholder="kuni"
                                   className=" text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                        </div>
                    </div>
                    <div className="mb-1.5 ">
                        <input type="text" placeholder="Kütus"
                               className=" text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div className="mb-1.5">
                        <input type="text" placeholder="Käigukast"
                               className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div className="mb-1.5">
                        <input type="text" placeholder="Vedav sild"
                               className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div className="mb-1.5">
                        <input type="text" placeholder="Kuulutuse vanus"
                               className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Järjesta"
                               className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"/>
                    </div>
                    <div>
                        <button
                            className="bg-[#8eb51e] hover:brightness-110 text-white text-lg p-1 justify-center w-[150px] mx-auto block transition duration-300">OTSI
                        </button>
                        <p className="text-[12px] mt-2 justify-center mx-auto block w-[75px] opacity-80">täpsem otsing</p>
                    </div>

                </form>
            </div>

    );
};

export default MenuBar;