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
        fetchCarCount();
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const fetchCarCount = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/count`);
            if (response.ok) {
                const data = await response.json();
                setCarCount(data);
            } else {
                console.error("Failed to fetch car count");
            }
        } catch (error) {
            console.error("Error fetching car count:", error);
        }
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
        <div className={`relative inline-block mt-2 ${isMenuVisible ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center">
                <p className="inline-flex w-[400px] md:w-[300px] mr-0 md:mr-4 justify-start shadow-sm px-2 py-1 bg-gray-500 font-medium text-white focus:outline-none">
                    <FontAwesomeIcon icon={faSearch} className="ml-0 size-5 pt-[1px] text-white pr-4"/>
                    Kõik liigid
                </p>
            </div>

            <div className="w-[400px] md:w-[300px] overflow-y-auto flex flex-col">
                <form className="text-sm text-black bg-[#f4f4f4] p-4 shadow-lg flex-1 flex flex-col justify-between">
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
                        className="bg-[#8eb51e] hover:brightness-110 text-white text-lg p-1 justify-center w-[150px] mx-auto block transition duration-300"
                    >
                        OTSI {showCarCount && carCount > 0 ? `(${carCount})` : ""}
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputField: React.FC<{ name: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ name, placeholder, value, onChange }) => (
    <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full text-sm border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none mb-2"
    />
);

const RangeInput: React.FC<{ label: string; fromName: string; toName: string; filters: Record<string, string>; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, fromName, toName, filters, onChange }) => (
    <div className="flex flex-col mb-3">
        <label className="block text-sm text-gray-700">{label}</label>
        <div className="flex gap-2">
            <InputField name={fromName} placeholder="Alates" value={filters[fromName]} onChange={onChange} />
            <InputField name={toName} placeholder="Kuni" value={filters[toName]} onChange={onChange} />
        </div>
    </div>
);

export default ExtendedMenuBar;