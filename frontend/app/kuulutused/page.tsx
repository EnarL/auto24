"use client";

import React, { useState } from 'react';
import ListingPage from '@/app/components/homepage/Kuulutused';
import ExtendedMenuBar from "@/app/components/common/ExtendedMenuBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

const vehicleTypes = [
    'Sõiduauto', 'Veoauto', 'Mootorsaan', 'Maastur', 'Haagis', 'Veesõiduk',
    'Kaubik', 'Mototehnika', 'Eritehnika', 'Buss', 'ATV / UTV', 'Haagissuvila ja autoelamu'
];

const Page: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };



    return (
        <div className="mt-2 overflow-x-hidden">
            <main>
                <div className="flex">
                    <ExtendedMenuBar showCarCount={true} isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
                    <div className={`flex-grow transition-all duration-300 ${isMenuVisible ? 'ml-[50px]' : 'ml-0'}`}>
                        <div className="flex items-center mb-2">
                            <button
                                className="border border-gray-500 border-1 px-2 py-1 mt-2 flex items-center md:hidden"
                                onClick={toggleMenu}
                            >
                                <FontAwesomeIcon icon={faSlidersH} className="h-5 w-5 mr-1 text-gray-500" />
                                Filtrid
                            </button>
                        </div>

                        <div className="flex border-l-2 cursor-pointer">
                            <p className="border-r-2 p-2 border-t-2 border-t-[#06c]">Müügikuulutused</p>
                            <p className="p-2 border-b-2 flex-grow hover:text-blue-600 mt-[2px]">Ostukuulutused</p>
                        </div>
                        <p className="pt-2 pb-2 opacity-60">VALI SÕIDUKI LIIGI JÄRGI</p>
                        <div className="grid grid-cols-4">
                            {vehicleTypes.map((type, index) => (
                                <div key={index} className="hover:bg-gray-100 p-[2px] text-[14px] cursor-pointer">
                                    {type}
                                </div>
                            ))}
                        </div>
                        <div>
                            <ListingPage
                                carCount={15}
                                columns={{ sm: 3, md: 5, lg: 5 }}
                                imageHeight="h-36"
                                imageWidth="w-full"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;
