"use client"
import React from 'react';
import MenuBar from '../components/menubar';
import CarGrid from '../components/kuulutused';

const vehicleTypes = [
    'Sõiduauto',
    'Veoauto',
    'Mootorsaan',
    'Maastur',
    'Haagis',
    'Veesõiduk',
    'Kaubik',
    'Mototehnika',
    'Eritehnika',
    'Buss',
    'ATV / UTV',
    'Haagissuvila ja autoelamu'
];




const Page: React.FC = () => {
    return (
        <>
            <div className="mt-4">
                <main className="">
                    <div className="grid grid-cols-2 gap-[10px] h-[633px]" style={{gridTemplateColumns: '250px 740px'}}>
                        <div className="col-span-1 w-[250px]">
                            <MenuBar/>
                        </div>
                        <div>
                            <div className="flex border-l-2 cursor-pointer ">
                                <p className="border-r-2 p-2 border-t-2 border-t-[#06c]">Müügikuulutused</p>
                                <p className="p-2 border-b-2 flex-grow hover:text-blue-600 mt-[2px]">Ostukuulutused</p>
                            </div>
                            <p className="pt-2 pb-2 opacity-60">VALI SÕIDUKI LIIGI JÄRGI</p>
                            <div className="grid grid-cols-4">
                                {vehicleTypes.map((brand, index) => (
                                    <div key={index} className="hover:bg-gray-100 p-[2px] text-[14px] cursor-pointer">
                                        {brand}
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6">
                                <CarGrid columns={5} rows={4} carCount={20}/>
                            </div>
                        </div>


                    </div>

                </main>
            </div>
        </>
    );
};

export default Page;