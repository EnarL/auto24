import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const PopularBrands: React.FC = () => {
    const router = useRouter();
    const handleBrandClick = (brand: string) => {
        router.push(`search/cars?make=${brand}`);
    };

    const carBrands = [
        'Audi', 'BMW', 'Citroen', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mercedes-Benz', 'Nissan',
        'Opel', 'Peugeot', 'Renault', 'Skoda', 'Subaru', 'Toyota', 'Volkswagen', 'Volvo'
    ];

    const otherBrands = [
        'Alfa Romeo', 'Aston Martin', 'Bentley', 'Cadillac', 'Chevrolet', 'Chrysler', 'Cupra', 'Dacia', 'Dodge',
        'Ferrari', 'Fiat', 'GAZ', 'GMC', 'Infiniti', 'Jaguar', 'Jeep', 'Lamborghini', 'Lancia', 'Land Rover',
        'Lexus', 'Lincoln', 'MINI', 'Maserati', 'Mercedes-AMG', 'Mitsubishi', 'Moskvich', 'Porsche', 'Ram', 'SEAT',
        'Saab', 'SsangYong', 'Suzuki', 'Tesla', 'VAZ'
    ];

    // Function to split array into chunks for grid display
    const splitArrayIntoChunks = (array: string[], chunkSize: number) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    const columns = splitArrayIntoChunks(carBrands, Math.ceil(carBrands.length / 2)); // Prepare columns for rendering
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

    // Handlers
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div>
            <h1 className="text-[18px] mb-2 mt-3 md:mt-0 font-sans opacity-60">POPULAARSED MARGID</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 cursor-pointer">
                {columns.flat().map((brand) => (
                    <p key={brand} onClick={() => handleBrandClick(brand)} className="hover:text-blue-500 hover:underline">
                        {brand}
                    </p>
                ))}
                <p onClick={toggleDropdown} className="cursor-pointer p-1 border border-gray-300 rounded inline-block text-[12px] w-20">
                    --muu--
                    <span className="ml-1">▼</span>
                </p>
                {showDropdown && (
                    <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-80 overflow-y-auto z-10">
                        <ul className="list-disc list-inside p-2">
                            {otherBrands.map((brand) => (
                                <div key={brand} className="p-1 hover:bg-gray-100 hover:text-blue-500" onClick={() => handleBrandClick(brand)}>
                                    {brand}
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularBrands;
