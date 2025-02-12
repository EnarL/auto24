import React, { useState } from 'react';
import { AdditionalDetailsFeatures } from '../data/labels'; // Import the data

interface AdditionalFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalFeatures: React.FC<AdditionalFeaturesProps> = ({ formData, handleChange }) => {
    // States to control the visibility of info fields
    const [showRoofRailsInfo, setShowRoofRailsInfo] = useState(false);
    const [showDoubleGlazingInfo, setShowDoubleGlazingInfo] = useState(false);

    return (
        <div>
            <h1 className="text-[16px] mb-2 mt-2">MUU VARUSTUS</h1>
            <div className="grid grid-cols-2 text-[12px]">
                {AdditionalDetailsFeatures.map((item) => {
                    let showInfo = false;
                    let setShowInfo: (value: (((prevState: boolean) => boolean) | boolean)) => void = () => {};

                    if (item.name === 'roofRails') {
                        showInfo = showRoofRailsInfo;
                        setShowInfo = setShowRoofRailsInfo;
                    } else if (item.name === 'doubleGlazing') {
                        showInfo = showDoubleGlazingInfo;
                        setShowInfo = setShowDoubleGlazingInfo;
                    }

                    return (
                        <div key={item.name} className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name={item.name}
                                    checked={formData[item.name]}
                                    onChange={handleChange}
                                    className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                                />
                                {item.label}
                                {(item.name === "roofRails" || item.name === "doubleGlazing") && setShowInfo && (
                                    <button
                                        type="button"
                                        onClick={() => setShowInfo(!showInfo)}
                                        className="ml-2 text-blue-600"
                                    >
                                        +
                                    </button>
                                )}
                            </label>
                            {showInfo && (
                                <input
                                    type="text"
                                    name={`${item.name}Info`}
                                    value={formData[`${item.name}Info`]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:border-blue-600 focus:outline-none mt-2"
                                    placeholder={`Lisa ${item.label} lisainfo`}
                                />
                            )}
                        </div>
                    );
                })}
                <label className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                    <span className="mb-2">Muud lisad (eraldamiseks kasuta semikoolonit ;)</span>
                    <input
                        type="text"
                        name="otherExtras"
                        value={formData.otherExtras}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:border-blue-600 focus:outline-none mr-2"
                        placeholder="Lisa oma lisad"
                    />
                </label>
            </div>
        </div>
    );
};

export default AdditionalFeatures;
