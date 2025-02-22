"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface MenuBarProps {
    showCarCount: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({ showCarCount }) => {
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
        transmission: "",
        driveType: "",
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
            } else if (key === "odometerReadingKM") {
                const [mileageFrom, mileageTo] = value.split("-");
                newFilters["mileageFrom"] = mileageFrom;
                newFilters["mileageTo"] = mileageTo;
            } else {
                newFilters[key] = value;
            }
        });
        setFilters((prev) => ({ ...prev, ...newFilters }));

        // Fetch car count from the backend
        fetchCarCount();
    }, [searchParams]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const fetchCarCount = async () => {
        try {
            const response = await fetch('http://localhost:8080/cars/count');
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
                .filter(([_, value]) => value.trim() !== "")
                .reduce((acc, [key, value]) => {
                    if (key === "yearFrom" || key === "yearTo") {
                        acc["firstRegistrationDate"] = `${filters.yearFrom}-${filters.yearTo}`;
                    } else if (key === "priceFrom" || key === "priceTo") {
                        acc["price"] = `${filters.priceFrom}-${filters.priceTo}`;
                    } else if (key === "powerFrom" || key === "powerTo") {
                        acc["enginePowerKW"] = `${filters.powerFrom}-${filters.powerTo}`;
                    } else if (key === "mileageFrom" || key === "mileageTo") {
                        acc["odometerReadingKM"] = `${filters.mileageFrom}-${filters.mileageTo}`;
                    } else {
                        acc[key] = value;
                    }
                    return acc;
                }, {} as Record<string, string>)
        ).toString();

        console.log("Query Params:", queryParams);

        if (queryParams) {
            router.push(`/cars?${queryParams}`);
        } else {
            console.log("No valid filters found.");
        }
    };

    return (
        <div className="relative inline-block mt-2">
            <div className="flex items-center">
                <p className="inline-flex justify-start w-[250px] shadow-sm px-2 py-1 bg-gray-500 font-medium text-white focus:outline-none">
                    <FontAwesomeIcon icon={faSearch} className="ml-0 size-5 pt-[1px] text-white pr-4" />
                    Kõik liigid
                </p>
            </div>

            <form className="w-[250px] text-sm text-black bg-[#f4f4f4] p-4 shadow-lg">
                <input
                    type="text"
                    name="make"
                    placeholder="Mark"
                    value={filters.make}
                    onChange={handleInputChange}
                    className="block w-full text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none mb-1.5"
                />

                <input
                    type="text"
                    name="model"
                    placeholder="Mudel"
                    value={filters.model}
                    onChange={handleInputChange}
                    className="block w-full text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none mb-1.5"
                />

                <label className="block text-[12px] text-gray-700">Aasta</label>
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                    <input
                        type="text"
                        name="yearFrom"
                        placeholder="Alates"
                        value={filters.yearFrom}
                        onChange={handleInputChange}
                        className="text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="yearTo"
                        placeholder="Kuni"
                        value={filters.yearTo}
                        onChange={handleInputChange}
                        className="text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none"
                    />
                </div>

                <label className="block text-[12px] text-gray-700">Hind</label>
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                    <input
                        type="text"
                        name="priceFrom"
                        placeholder="Alates"
                        value={filters.priceFrom}
                        onChange={handleInputChange}
                        className="text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="priceTo"
                        placeholder="Kuni"
                        value={filters.priceTo}
                        onChange={handleInputChange}
                        className="text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none"
                    />
                </div>

                <label className="block text-[12px] text-gray-700">Võimsus (kW)</label>
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                    <input
                        type="text"
                        name="powerFrom"
                        placeholder="Alates"
                        value={filters.powerFrom}
                        onChange={handleInputChange}
                        className="text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="powerTo"
                        placeholder="Kuni"
                        value={filters.powerTo}
                        onChange={handleInputChange}
                        className="text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none"
                    />
                </div>

                <label className="block text-[12px] text-gray-700">Läbisõidumõõdiku näit (km)</label>
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                    <input
                        type="text"
                        name="mileageFrom"
                        placeholder="Alates"
                        value={filters.mileageFrom}
                        onChange={handleInputChange}
                        className="text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="mileageTo"
                        placeholder="Kuni"
                        value={filters.mileageTo}
                        onChange={handleInputChange}
                        className="text-[12px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none"
                    />
                </div>

                <div className="mb-1.5">
                    <input
                        type="text"
                        name="fuelType"
                        placeholder="Kütus"
                        value={filters.fuelType}
                        onChange={handleInputChange}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div className="mb-1.5">
                    <input
                        type="text"
                        name="transmission"
                        placeholder="Käigukast"
                        value={filters.transmission}
                        onChange={handleInputChange}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <div className="mb-1.5">
                    <input
                        type="text"
                        name="driveType"
                        placeholder="Vedav sild"
                        value={filters.driveType}
                        onChange={handleInputChange}
                        className="text-[12px] block w-full border-gray-300 border-[1px] px-2 p-0.5 focus:border-blue-600 focus:outline-none"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-[#8eb51e] mt-4 hover:brightness-110 text-white text-lg p-1 justify-center w-[150px] mx-auto block transition duration-300"
                >
                    OTSI {showCarCount && carCount > 0 ? `(${carCount})` : ""}
                </button>
            </form>
        </div>
    );
};

export default MenuBar;