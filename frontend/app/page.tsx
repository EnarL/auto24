"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Foobar from './components/foobar';
import MenuBar from '../app/components/menubar';
import Placeholder from '../app/components/placeholder';
import CarGrid from '../app/components/kuulutused';
import SearchSection from "@/app/components/searchsection";
import PopularBrands from "@/app/components/popularbrands";

const carBrands = [
    'Audi', 'BMW', 'Citroen', 'Ford', 'Honda', 'Hyundai','Kia', 'Mercedes-Benz', 'Nissan',
    'Opel', 'Peugeot', 'Renault', 'Skoda', 'Subaru', 'Toyota', 'Volkswagen', 'Volvo'
];

const otherBrands = [
    'Alfa Romeo', 'Aston Martin', 'Bentley', 'Cadillac', 'Chevrolet', 'Chrysler', 'Cupra', 'Dacia', 'Dodge',
    'Ferrari', 'Fiat', 'GAZ', 'GMC','Infiniti','Jaguar', 'Jeep' , 'Lamborghini','Lancia', 'Land Rover',
    'Lexus', 'Lincoln', 'MINI', 'Maserati', 'Mercedes-AMG', 'Mitsubishi', 'Moskvich','Porsche','Ram','SEAT',
    'Saab','SsangYong','Suzuki','Tesla', 'VAZ'
];

const splitArrayIntoChunks = (array: string[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
};

const Page: React.FC = () => {
    const router = useRouter();
    const columns = splitArrayIntoChunks(carBrands, Math.ceil(carBrands.length / 2));

    const handleBrandClick = (brand: string) => {
        router.push(`/cars?make=${brand}`);
    };

    return (
        <>
            <div className="mt-4">
                <main className="">
                    <div className="grid grid-cols-2 gap-[10px] h-[633px]" style={{ gridTemplateColumns: '250px 740px' }}>
                        <div className="col-span-1 w-[250px]">
                            <h1 className="text-[18px] font-sans w-[250px] opacity-60">SÕIDUKIKUULUTUSED</h1>
                            <MenuBar showCarCount={true} />
                        </div>
                        <div className="col-span-1 row-span-1">
                            <div className="grid grid-cols-2 grid-columns w-[740px] row-span-1 h-[250px]">
                                <SearchSection/>
                                <PopularBrands columns={columns} otherBrands={otherBrands} onBrandClick={handleBrandClick}/>
                            </div>
                            <div
                                className="col-span-2 row-span-2 w-[740px] h-[116px] mt-4 flex justify-between items-center invisible md:visible md:flex">
                                <div className="flex items-center">
                                    <input type="search" id="search"
                                           className="w-32 h-10 mr-2 ml-6 text-center text-2xl rounded-md border-2 focus:border-gray-300 focus:outline-none"></input>
                                    <button className="bg-[#06c] text-white text-[12px] p-2 pr-6 pl-6">
                                        Vaata turuhinda
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <img src={"https://www.auto24.ee/images/custom_sections/main_offers/add_ad.png"}
                                         alt="Add ad" className="object-cover mr-2 "/>
                                    <button className="bg-[#FCBA3C] text-white text-[12px] p-2 pr-6 pl-6">
                                        Lisa kuulutus
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-2 row-span-3 ">
                                <Placeholder/>
                            </div>
                        </div>

                    </div>
                    <div className="pt-6">
                        <CarGrid columns={6} carCount={30} />
                    </div>

                </main>

            </div>
        </>
    );
};

export default Page;