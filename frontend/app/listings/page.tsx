"use client";

import React, { useState } from 'react';
import Listings from '@/app/components/homepage/Listings';
import ExtendedMenuBar from "@/app/components/common/ExtendedMenuBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';

const Page: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    return (
        <div className="">
            <main className="container flex w-[1000px] mt-4">
                <div className="">
                    <ExtendedMenuBar showCarCount={false} isMenuVisible={true} toggleMenu={toggleMenu} />
                </div>
                <div className="ml-4 w-[750px]">
                    <Listings
                        carCount={20}
                        columns={{ sm: 3, md: 2, lg: 3 }}
                    />
                </div>
            </main>
        </div>
    );
};

export default Page;