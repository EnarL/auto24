import React, { useState } from 'react';
import { interiorFeatures as features } from '@/app/data/labels';

interface InteriorFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InteriorFeatures: React.FC<InteriorFeaturesProps> = ({ formData, handleChange }) => {
    const [showInfo, setShowInfo] = useState<{ [key: string]: boolean }>({});

    const toggleInfo = (name: string) => {
        setShowInfo((prevState) => ({
            ...prevState,
            [name]: !prevState[name]
        }));
    };

    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">SISUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name={feature.name}
                                checked={formData[feature.name]}
                                onChange={handleChange}
                                className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                            />
                            {feature.label}
                            {feature.name === "decorativeTrim" && (
                                <button
                                    type="button"
                                    onClick={() => toggleInfo(feature.name)}
                                    className="ml-2 text-blue-600"
                                >
                                    +
                                </button>
                            )}
                        </label>
                        {showInfo[feature.name] && (
                            <input
                                type="text"
                                name={`${feature.name}Info`}
                                value={formData[`${feature.name}Info`]}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:border-blue-600 focus:outline-none mt-2"
                                placeholder={`Lisa ${feature.label} lisainfo`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InteriorFeatures;
