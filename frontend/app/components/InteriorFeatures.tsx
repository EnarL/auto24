import React, { useState } from 'react';

interface InteriorFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InteriorFeatures: React.FC<InteriorFeaturesProps> = ({ formData, handleChange }) => {
    const [showDecorativeTrimInfo, setShowDecorativeTrimInfo] = useState(false);

    const interiorFeatures = [
        { name: "decorativeTrim", label: "Iluliistud salongis", showInfo: showDecorativeTrimInfo, setShowInfo: setShowDecorativeTrimInfo },
        { name: "seatBackPockets", label: "Taskud esiistmete seljatugedes" },
        { name: "floorMats", label: "Jalamatid" },
        { name: "underSeatDrawers", label: "Sahtlid esiistmete all" },
        { name: "trunkMat", label: "Pagasiruumi matt" },
        { name: "cupHolders", label: "Topsihoidjad" },
        { name: "leatherGearKnob", label: "Nahkkattega käigukanginupp" },
        { name: "leatherHandbrake", label: "Nahkkattega käsipidurikang" },
        { name: "darkHeadliner", label: "Tume laepolster" }
    ];

    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">SISUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {interiorFeatures.map((feature) => (
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
                            {feature.name === "decorativeTrim" && feature.setShowInfo && (
                                <button
                                    type="button"
                                    onClick={() => feature.setShowInfo(!feature.showInfo)}
                                    className="ml-2 text-blue-600"
                                >
                                    +
                                </button>
                            )}
                        </label>
                        {feature.showInfo && (
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