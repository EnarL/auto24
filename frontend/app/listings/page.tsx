"use client";

import React, { useState } from 'react';
import Listings from '@/app/components/homepage/Listings';
import ExtendedMenuBar from "@/app/components/common/ExtendedMenuBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

const Page: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    return (
        <div className="mt-2 flex overflow-x-hidden">
            <ExtendedMenuBar showCarCount={false} isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
            <main className="flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                    <button
                        className="border border-gray-500 px-2 py-1 mt-2 ml-4 flex items-center md:hidden"
                        onClick={toggleMenu}
                    >
                        <FontAwesomeIcon icon={faSlidersH} className="h-5 w-5 mr-1 text-gray-500" />
                        Filtrid
                    </button>
                </div>
                {/* Fixed: Replace fixed widths with responsive classes */}
                <div className="flex w-full max-w-[1200px] mt-2 px-4 md:px-0">
                    <div className="w-full max-w-[900px]">
                        <Listings
                            carCount={20}
                            columns={{sm: 2, md: 3, lg: 4}}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;