"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MenuBar: React.FC<{ onSearch: (params: any) => void }> = ({ onSearch }) => {
    const { slug } = useParams();
    const slugString = Array.isArray(slug) ? slug[0] : slug;
    const decodedSlug = slugString ? decodeURIComponent(slugString) : '';
    const [isOpen, setIsOpen] = useState(false);
    const [mark, setMark] = useState('');
    const [model, setModel] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [yearFrom, setYearFrom] = useState('');
    const [yearTo, setYearTo] = useState('');
    const [powerFrom, setPowerFrom] = useState('');
    const [powerTo, setPowerTo] = useState('');
    const [mileageFrom, setMileageFrom] = useState('');
    const [mileageTo, setMileageTo] = useState('');
    const [fuel, setFuel] = useState('');
    const [transmission, setTransmission] = useState('');
    const [driveType, setDriveType] = useState('');
    const [adAge, setAdAge] = useState('');
    const [sort, setSort] = useState('');

    useEffect(() => {
        setMark(decodedSlug);
    }, [decodedSlug]);

    const handleSearch = () => {
        onSearch({
            mark,
            model,
            priceFrom,
            priceTo,
            yearFrom,
            yearTo,
            powerFrom,
            powerTo,
            mileageFrom,
            mileageTo,
            fuel,
            transmission,
            driveType,
            adAge,
            sort,
        });
    };

    return (
        <div className="relative inline-block text mt-4">
            <div className="flex items-center">
                <button
                    type="button"
                    className="inline-flex justify-start w-[250px] shadow-sm px-2 py-1 bg-gray-500 font-medium text-white focus:outline-none"
                >
                    <FontAwesomeIcon icon={faSearch} className="ml-0 size-5 text-white pr-4" />
                    Kõik liigid
                </button>
            </div>

            <form className="w-[250px] text-s text-black bg-[#f4f4f4] p-4">
                <div className="mb-1.5 border-1 border-gray-500">
                    <input type="number" placeholder="Keretüüp" className="block text-[12px] w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none" />
                </div>
                <div className="mb-1.5">
                    <input
                        type="text"
                        placeholder="Mark"
                        value={mark}
                        onChange={(e) => setMark(e.target.value)}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div className="mb-1.5">
                    <input
                        type="text"
                        placeholder="Mudel"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div className="mb-1.5">
                    <input type="text" placeholder="Muu mudel või täpsustus" className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none" />
                </div>
                <div className="mb-1.5">
                    <label className="block text-gray-700 text-[12px]">Aasta</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="alates"
                            value={yearFrom}
                            onChange={(e) => setYearFrom(e.target.value)}
                            className="text-[14px] block w-full border-gray-300 border-[1px] px-2 focus:border-blue-600 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="kuni"
                            value={yearTo}
                            onChange={(e) => setYearTo(e.target.value)}
                            className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mb-1.5">
                    <label className="block text-[12px] text-gray-700">Hind</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="alates"
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                            className="text-[14px] block w-full border-gray-300 border-[1px] px-2 focus:border-blue-600 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="kuni"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mb-1.5">
                    <label className="block text-[12px] text-gray-700">Võimsus (kW)</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="alates"
                            value={powerFrom}
                            onChange={(e) => setPowerFrom(e.target.value)}
                            className="mt-1 text-[14px] block w-full border-gray-300 border-[1px] px-2 focus:border-blue-600 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="kuni"
                            value={powerTo}
                            onChange={(e) => setPowerTo(e.target.value)}
                            className="mt-1 text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mb-1.5">
                    <label className="block text-[12px] text-gray-700">Läbisõidumõõdiku näit (km)</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="alates"
                            value={mileageFrom}
                            onChange={(e) => setMileageFrom(e.target.value)}
                            className="mt text-[14px] block w-full border-gray-300 border-[1px] px-2 focus:border-blue-600 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="kuni"
                            value={mileageTo}
                            onChange={(e) => setMileageTo(e.target.value)}
                            className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="mb-1.5">
                    <input
                        type="text"
                        placeholder="Kütus"
                        value={fuel}
                        onChange={(e) => setFuel(e.target.value)}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div className="mb-1.5">
                    <input
                        type="text"
                        placeholder="Käigukast"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div className="mb-1.5">
                    <input
                        type="text"
                        placeholder="Vedav sild"
                        value={driveType}
                        onChange={(e) => setDriveType(e.target.value)}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div className="mb-1.5">
                    <input
                        type="text"
                        placeholder="Kuulutuse vanus"
                        value={adAge}
                        onChange={(e) => setAdAge(e.target.value)}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Järjesta"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-[#8eb51e] hover:brightness-110 text-white text-lg p-1 justify-center w-[150px] mx-auto block transition duration-300"
                    >
                        OTSI
                    </button>
                    <p className="text-[12px] mt-2 justify-center mx-auto block w-[75px] opacity-80">täpsem otsing</p>
                </div>
            </form>
        </div>
    );
};

export default MenuBar;