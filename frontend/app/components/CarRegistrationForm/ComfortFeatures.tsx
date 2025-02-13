import React, { useState } from 'react';
import { comfortfeatures } from '@/app/data/labels'; // Import features data

interface FeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Features: React.FC<FeaturesProps> = ({ formData, handleChange }) => {
    const [showSunroofInfo, setShowSunroofInfo] = useState(false);
    const [showEnginePreheaterInfo, setShowEnginePreheaterInfo] = useState(false);
    const [showCabinPreheaterInfo, setShowCabinPreheaterInfo] = useState(false);
    const getFeatureWithState = (feature: any) => {
        if (feature.name === 'sunroof') {
            return { ...feature, showInfo: showSunroofInfo, setShowInfo: setShowSunroofInfo };
        }
        if (feature.name === 'enginePreheater') {
            return { ...feature, showInfo: showEnginePreheaterInfo, setShowInfo: setShowEnginePreheaterInfo };
        }
        if (feature.name === 'cabinPreheater') {
            return { ...feature, showInfo: showCabinPreheaterInfo, setShowInfo: setShowCabinPreheaterInfo };
        }
        return feature;
    };

    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">MUGAVUSVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {comfortfeatures.map((feature) => {
                    const featureWithState = getFeatureWithState(feature);
                    return (
                        <div key={featureWithState.name} className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name={featureWithState.name}
                                    checked={formData[featureWithState.name]}
                                    onChange={handleChange}
                                    className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                                />
                                {featureWithState.label}
                                {featureWithState.setShowInfo && (
                                    <button
                                        type="button"
                                        onClick={() => featureWithState.setShowInfo(!featureWithState.showInfo)}
                                        className="ml-2 text-blue-600"
                                    >
                                        +
                                    </button>
                                )}
                            </label>
                            {featureWithState.showInfo && (
                                <input
                                    type="text"
                                    name={`${featureWithState.name}Info`}
                                    value={formData[`${featureWithState.name}Info`]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:border-blue-600 focus:outline-none mt-2"
                                    placeholder={`Lisa ${featureWithState.label} lisainfo`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Features;
