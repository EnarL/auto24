"use client"
import React, { useState } from 'react';
import auto24 from "@/public/audiA6.jpg";
import auto23 from "@/public/auto24.svg";
import Image from "next/image";

interface CarProps {
    brand: string;
    model: string;
    price: string;
    imageUrl: string;
    year: number;
    mileage: number;
    fuelType: string;
}

const CarDetails: React.FC<CarProps> = ({ brand, model, price, imageUrl, year, mileage, fuelType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [auto24, auto24, auto24, auto23]; // List of images

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="container">
            <p className="text-[10px] opacity-50 p-2">
                <span style={{ display: "inline" }}>Sõiduauto</span> {'»'}
                <span style={{ display: "inline" }}>Audi</span> {'»'}
                <span style={{ display: "inline" }}>A3</span> {'»'}
                <span style={{ display: "inline" }}>2014-2016</span>
            </p>

            <header>
                <h1 className="text-2xl">Audi A3 e-Tron PlugIn hybrid Sportback B&O ATTRACTION 1.4 110kW</h1>
                <p className="text-xs pb-3 border-b-[1px] border-opacity-5 opacity-80 text-[10px]">
                    Uuendatud 5 p. tagasi
                </p>
            </header>

            <div className="grid grid-cols-2 grid-columns row-span-1 ">
                <div className="w-[500px]">
                    {["Liik", "Keretüüp", "Esmane reg", "Mootor", "Kütus", "Läbisõidumõõdiku näit", "Vedav sild", "Käigukast", "Värvus", "Reg. number", "VIN-kood", "Hind", "Soodushind"].map((label, index) => (
                        <p key={index}
                           className="border-b-[1px] border-opacity-5 ml-2 pb-1 pt-1 opacity-80 text-[14px]">
                            {label}:
                        </p>
                    ))}
                </div>
                <div className="grid grid-rows-2 gap-[80px] w-[500px] h-[500px] pt-2">
                    <div className="row-span-1">
                        <Image src={auto24} alt="247" className="w-full h-auto" />
                    </div>
                    <div className="row-span-1 grid gap-1 grid-cols-3">
                        {images.slice(0, 2).map((image, index) => (
                            <Image key={index} src={image} alt="247" className="w-full h-auto" />
                        ))}
                        <div className="relative w-full h-auto" onClick={() => openModal(2)}>
                            <Image src={images[3]} alt="247" className="w-full h-auto"/>
                            <div
                                className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 h-[92px] text-white text-2xl font-bold">
                                +
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
                    <button onClick={closeModal} className="absolute top-4 right-4 text-white text-2xl">X</button>
                    <button onClick={prevImage} className="absolute left-4 text-white text-2xl">{"<"}</button>
                    <Image src={images[currentIndex]} alt="Gallery Image" className="w-full h-auto max-w-3xl" />
                    <button onClick={nextImage} className="absolute right-4 text-white text-2xl">{">"}</button>
                    <div className="flex mt-4 space-x-2">
                        {images.map((image, index) => (
                            <div key={index} className={`cursor-pointer ${index === currentIndex ? 'border-2 border-white' : ''}`} onClick={() => setCurrentIndex(index)}>
                                <Image src={image} alt={`Thumbnail ${index}`} className="w-16 h-16 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <p className="bg-gray-100 font-semibold p-2">OSTUABI</p>

            <div className="h-[200px] grid row-span-3 justify-between items-center gap-4 p-2">
                <div className="flex items-center pt-2 justify-between">
                    <div className="flex items-center w-[400px]">
                        <img
                            src="https://www.auto24.ee/images/icons/services/icon_buyassist_check.svg"
                            className="w-[56px] mr-4"
                            alt="Buy Assist Icon"
                        />
                        <p className="text-blue-600">Ostueelne kontroll <br /><p className="text-black text-[12px]">Kontrolli sõiduki seisukorda ja tausta!</p></p>
                    </div>

                    <a
                        href="https://www.auto24.ee/ostuabi/?t=automaakler&vid=4163431"
                        className="bg-white hover:bg-blue-600 hover:text-white text-blue-600 inline border-blue-600 border-2 px-4 py-2 text-[12px] text-center"
                    >
                        Vaatan lähemalt
                    </a>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center w-[400px]">
                        <img
                            src="https://www.auto24.ee/images/icons/services/icon_history_check.svg?1"
                            className="w-[56px] mr-4"
                            alt="History Check Icon"
                        />
                        <p className="text-blue-600">
                            VIN päring <br />
                            <span className="text-black text-[12px]">Sõiduki andmete päring</span>
                        </p>
                    </div>
                    <a
                        href="https://vininfo.ee/"
                        className="bg-white hover:bg-blue-600 hover:text-white text-blue-600 inline border-blue-600 border-2 px-4 py-2 text-[12px] text-center"
                    >
                        Vaatan lähemalt
                    </a>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center w-[400px]">
                        <img
                            src="https://www.auto24.ee/images/icons/services/icon_tax_calculator.svg?1"
                            className="w-[56px] mr-4"
                            alt="Tax Calculator Icon"
                        />
                        <p className="text-blue-600">Automaksu kalkulaator <br /><p className="text-black text-[12px]">Arvuta aastamaks ja registreerimistasu</p></p>
                    </div>
                    <a
                        href="https://www.auto24.ee/ostuabi/automaksu-kalkulaator"
                        className="bg-white hover:bg-blue-600 hover:text-white text-blue-600 inline border-blue-600 border-2 px-4 py-2 text-[12px] text-center"
                    >
                        Vaatan lähemalt
                    </a>
                </div>
            </div>

            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">VARUSTUS</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">TEHNILISED NÄITAJAD</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">MUU INFORMATSIOON</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">MÜÜJA</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">KÜSIMUSED MÜÜJALE</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">SÕIDUKI OSTU FINANTSEERIMINE</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">VAATA MÜÜJA TEISI PAKKUMISI</p>
            </div>
        </div>
    );
};

export default CarDetails;