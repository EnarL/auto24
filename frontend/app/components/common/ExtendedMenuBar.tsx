"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface MenuBarProps {
    showCarCount: boolean;
    isMenuVisible: boolean;
    toggleMenu: () => void;
}

const ExtendedMenuBar: React.FC<MenuBarProps> = ({ showCarCount, isMenuVisible }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        make: "",
        model: "",
        priceFrom: "",
        priceTo: "",
        yearFrom: "",
        yearTo: "",
        powerFrom: "",
        powerTo: "",
        mileageFrom: "",
        mileageTo: "",
        fuelType: "",
        driveType: "",
        transmission: "",
        locationCountry: "",
        color: "",
    });
    const [carCount, setCarCount] = useState<number>(0);

    useEffect(() => {
        const newFilters: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            if (key === "firstRegistrationDate") {
                const [yearFrom, yearTo] = value.split("-");
                newFilters["yearFrom"] = yearFrom;
                newFilters["yearTo"] = yearTo;
            } else if (key === "price") {
                const [priceFrom, priceTo] = value.split("-");
                newFilters["priceFrom"] = priceFrom;
                newFilters["priceTo"] = priceTo;
            } else if (key === "enginePowerKW") {
                const [powerFrom, powerTo] = value.split("-");
                newFilters["powerFrom"] = powerFrom;
                newFilters["powerTo"] = powerTo;
            } else if (key === "odometerReading") {
                const [mileageFrom, mileageTo] = value.split("-");
                newFilters["mileageFrom"] = mileageFrom;
                newFilters["mileageTo"] = mileageTo;
            } else {
                newFilters[key] = value;
            }
        });
        setFilters((prev) => ({ ...prev, ...newFilters }));
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };



    const handleSearch = () => {
        const queryParams = new URLSearchParams(
            Object.entries(filters)
                .filter(([, value]) => value.trim() !== "")
                .reduce((acc, [key, value]) => {
                    if (key === "yearFrom" || key === "yearTo") {
                        acc["firstRegistrationDate"] = `${filters.yearFrom}-${filters.yearTo}`;
                    } else if (key === "priceFrom" || key === "priceTo") {
                        acc["price"] = `${filters.priceFrom}-${filters.priceTo}`;
                    } else if (key === "powerFrom" || key === "powerTo") {
                        acc["enginePowerKW"] = `${filters.powerFrom}-${filters.powerTo}`;
                    } else if (key === "mileageFrom" || key === "mileageTo") {
                        acc["odometerReading"] = `${filters.mileageFrom}-${filters.mileageTo}`;
                    } else {
                        acc[key] = value;
                    }
                    return acc;
                }, {} as Record<string, string>)
        ).toString();

        if (queryParams) {
            router.push(`/search/cars?${queryParams}`);
        }
    };

    return (
        <div className={`relative inline-block ${isMenuVisible ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center mt-2">
                <p className="inline-flex w-[400px] md:w-[300px] items-center shadow-md px-4 py-4 bg-green-600 text-white font-semibold rounded-md text-[16px] cursor-pointer transition-all hover:brightness-110">
                    <span className="flex items-center justify-center mr-2">
                        <FontAwesomeIcon icon={faSearch} className="text-white"/>
                    </span>
                    Kõik liigid
                </p>
            </div>

            <div className="w-[400px] md:w-[300px] overflow-y-auto flex flex-col rounded-md shadow-lg">
                <form className="text-sm text-black bg-gray-100 p-3 flex-1 flex flex-col justify-between rounded-md">
                    <InputField name="make" placeholder="Mark" value={filters.make} onChange={handleInputChange}/>
                    <InputField name="model" placeholder="Mudel" value={filters.model} onChange={handleInputChange}/>
                    <RangeInput label="Aasta" fromName="yearFrom" toName="yearTo" filters={filters}
                                onChange={handleInputChange}/>
                    <RangeInput label="Hind" fromName="priceFrom" toName="priceTo" filters={filters}
                                onChange={handleInputChange}/>
                    <RangeInput label="Võimsus (kW)" fromName="powerFrom" toName="powerTo" filters={filters}
                                onChange={handleInputChange}/>
                    <RangeInput label="Läbisõidumõõdiku näit (km)" fromName="mileageFrom" toName="mileageTo"
                                filters={filters} onChange={handleInputChange}/>
                    <InputField name="fuelType" placeholder="Kütus" value={filters.fuelType}
                                onChange={handleInputChange}/>
                    <InputField name="transmission" placeholder="Käigukast" value={filters.transmission}
                                onChange={handleInputChange}/>
                    <InputField name="driveType" placeholder="Vedav sild" value={filters.driveType}
                                onChange={handleInputChange}/>
                    <InputField name="color" placeholder="Värvus" value={filters.color} onChange={handleInputChange}/>
                    <InputField name="locationCountry" placeholder="Asukoht" value={filters.locationCountry}
                                onChange={handleInputChange}/>
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-green-600 hover:brightness-110 text-white text-lg p-2 rounded-md mx-auto block w-[150px] transition duration-300 shadow-md"
                    >
                        OTSI
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputField: React.FC<{
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}> = ({name, placeholder, value, onChange}) => (
    <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full text-sm border border-gray-300 px-3 py-2 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mb-3 transition-all"
    />
);

const RangeInput: React.FC<{ label: string; fromName: string; toName: string; filters: Record<string, string>; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, fromName, toName, filters, onChange }) => (
    <div className="flex flex-col mb-3">
        <label className="block text-sm text-gray-700">{label}</label>
        <div className="flex gap-4">
            <InputField name={fromName} placeholder="Alates" value={filters[fromName]} onChange={onChange} />
            <InputField name={toName} placeholder="Kuni" value={filters[toName]} onChange={onChange} />
        </div>
    </div>
);

export default ExtendedMenuBar;