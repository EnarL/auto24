"use client"

import React from 'react';
import Sidebar from '../components/Sidebar';

const MinuPage: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="flex">
                <Sidebar />
                <div className="flex flex-col ">
                    <div
                        className="mt-2 ml-[10px] w-[740px] h-[85px] from-white to-gray-200 opacity-80 bg-gradient-to-b border-gray-100 rounded-md flex justify-end items-end relative">
                        <div className="absolute top-0 left-0 p-2">
                            <p className="">Minu kuulutused</p>
                        </div>
                        <div className="flex text-[14px] h-full items-end">
                            <a href="/vali" className="w-[86px] h-full text-center cursor-pointer hover:text-[#06c] bg-white flex items-end justify-center">
                                Kõik
                            </a>
                            <a href="#" className="w-[86px] text-center h-full cursor-pointer hover:text-[#06c] flex items-end justify-center">
                                Sõidukite kuulutused
                            </a>
                            <a href="#" className="w-[86px] text-center h-full cursor-pointer hover:text-[#06c] flex items-end justify-center">
                                Kaubad ja varuosad
                            </a>
                            <a href="#" className="w-[86px] text-center h-full cursor-pointer hover:text-[#06c] flex items-end justify-center">
                                Firmad ja teenused
                            </a>
                            <a href="#" className="w-[86px] text-center h-full cursor-pointer hover:text-[#06c] flex items-end justify-center">
                                Reklaam-bännerid
                            </a>
                            <a href="#" className="w-[86px] text-center h-full cursor-pointer hover:text-[#06c] flex items-end justify-center">
                                Muud teenused
                            </a>
                        </div>
                    </div>
                    <div
                        className=" border-l-4 border-[#91d5ff] mt-4 ml-[10px] w-[740px] text-[#06c] mx-auto p-3 bg-gray-100 inline bg-[#f2faff] text-[14px] flex items-center">
                        <img src="https://www.auto24.ee/images/icons/msg/info.svg" alt="Info" className="mr-2"/>
                        <span>Teil ei ole praegu sisestatud ühtegi kuulutust. </span>
                        <a href="#" className="underline ml-1">Sisesta kuulutus</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MinuPage;