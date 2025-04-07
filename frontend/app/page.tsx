"use client";
import React from 'react';
import Menubar from './components/common/Menubar';
import Placeholder from '@/app/components/homepage/Placeholder';

import Searchsection from "@/app/components/homepage/Searchsection";
import Popularbrands from "@/app/components/homepage/Popularbrands";
import Listings from "@/app/components/homepage/Listings";

const Page: React.FC = () => {
    return (
        <>
            <div className="mt-4">
                <main>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] h-[633px] overflow-hidden" style={{ gridTemplateColumns: '1fr 740px' }}>
                        <div className="col-span-1 md:w-[250px]">
                            <h1 className="text-[18px] font-sans opacity-60">SÕIDUKIKUULUTUSED</h1>
                            <Menubar showCarCount={true} />

                        </div>
                        <div className="col-span-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full">
                                <Searchsection />
                                <div className="md:col-span-1">
                                    <Popularbrands />
                                </div>
                            </div>
                            <div className="col-span-2 row-span-2 w-full h-[116px] mt-4 flex justify-between items-center invisible md:visible md:flex">
                                <div className="flex items-center">
                                    <input
                                        type="search"
                                        id="search"
                                        className="w-32 h-10 mr-2 ml-2 text-center text-2xl rounded-md border-2 focus:border-gray-300 focus:outline-none"
                                    />
                                    <button className="bg-[#06c] text-white text-[12px] p-2 pr-6 pl-6">
                                        Vaata turuhinda
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        src={"https://www.auto24.ee/images/custom_sections/main_offers/add_ad.png"}
                                        alt="Add ad"
                                        className="object-cover mr-2"
                                    />
                                    <button className="bg-[#FCBA3C] text-white text-[12px] p-2 pr-6 pl-6">
                                        Lisa kuulutus
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-2 row-span-3">
                                <Placeholder />
                            </div>
                        </div>
                    </div>
                    <div className="pt-6">
                        <h1 className="text-1xl font-extralight opacity-65">VALIK KUULUTUSI</h1>
                        <Listings
                            carCount={30}
                            columns={{ sm: 2, md: 4, lg: 6 }}
                        />

                    </div>
                </main>
            </div>
        </>
    );
};

export default Page;
