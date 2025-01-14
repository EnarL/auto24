import React, { useState } from 'react';

interface PopularBrandsProps {
    columns: string[][];
    otherBrands: string[];
    className?: string;
}

const PopularBrands: React.FC<PopularBrandsProps> = ({ columns, otherBrands, className }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={className}>
            <h1 className="text-[18px] mb-2 font-sans opacity-60">POPULAARSED MARGID</h1>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {columns.flat().map((brand, index) => (
                    <p key={index}>{brand}</p>
                ))}
                <p onClick={toggleDropdown} className="cursor-pointer p-1 border border-gray-300 rounded inline-block text-[12px] w-20">
                    --muu--
                    <span className="ml-1">▼</span>
                </p>
                {showDropdown && (
                    <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-80 overflow-y-auto z-10">
                        <ul className="list-disc list-inside p-2">
                            {otherBrands.map((brand, index) => (
                                <div key={index} className="p-1 hover:bg-gray-100">{brand}</div>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularBrands;