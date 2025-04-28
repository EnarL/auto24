"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface MenuBarProps {
    showCarCount: boolean;
}

const Menubar: React.FC<MenuBarProps> = ({ showCarCount }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        make: "", model: "", priceFrom: "", priceTo: "",
        yearFrom: "", yearTo: "",
        mileageFrom: "", mileageTo: "", fuelType: ""
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
            }
            else if (key === "odometerReading") {
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

            <form className="bg-gray-50 rounded-lg shadow-sm border overflow-hidden">
                <h1 className="text-2xl border-gray-100 font-semibold mb-4 mt-6">LEIA ENDALE SOBIV AUTO</h1>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div>
                            <InputField
                                name="make"
                                placeholder="Mark"
                                value={filters.make}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <InputField
                                name="model"
                                placeholder="Mudel"
                                value={filters.model}
                                onChange={handleInputChange}
                            />
                        </div>

                        <RangeInput
                            fromName="yearFrom"
                            toName="yearTo"
                            fromPlaceholder="Aasta"
                            toPlaceholder="kuni"
                            filters={filters}
                            onChange={handleInputChange}
                        />

                        <RangeInput
                            fromName="priceFrom"
                            toName="priceTo"
                            fromPlaceholder="Hind"
                            toPlaceholder="kuni"
                            filters={filters}
                            onChange={handleInputChange}
                        />

                        <RangeInput
                            fromName="mileageFrom"
                            toName="mileageTo"
                            fromPlaceholder="Läbisõit"
                            toPlaceholder="kuni"
                            filters={filters}
                            onChange={handleInputChange}
                        />

                        <div>
                            <InputField
                                name="fuelType"
                                placeholder="Kütus"
                                value={filters.fuelType}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors shadow-sm"
                    >
                        OTSI {showCarCount && carCount > 0 && (
                        <span className="ml-2 bg-green-500 px-2 py-0.5 rounded-full text-sm">{carCount}</span>
                    )}
                    </button>
                </div>
            </form>
    );
};

interface InputFieldProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ name, placeholder, value, onChange }) => (
    <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
    />
);

interface RangeInputProps {
    fromName: string;
    toName: string;
    fromPlaceholder: string;
    toPlaceholder: string;
    filters: Record<string, string>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({
                                                   fromName,
                                                   toName,
                                                   fromPlaceholder,
                                                   toPlaceholder,
                                                   filters,
                                                   onChange
                                               }) => (
    <div className="flex gap-2 items-center">
        <input
            type="text"
            name={fromName}
            placeholder={fromPlaceholder}
            value={filters[fromName]}
            onChange={onChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
        />
        <span className="text-gray-300">—</span>
        <input
            type="text"
            name={toName}
            placeholder={toPlaceholder}
            value={filters[toName]}
            onChange={onChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
        />
    </div>
);

export default Menubar;