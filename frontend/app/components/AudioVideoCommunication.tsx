import React, { useState } from 'react';
import { AudioVideoCommunicationFeatures } from '../data/labels';

interface AudioVideoCommunicationProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AudioVideoCommunication: React.FC<AudioVideoCommunicationProps> = ({ formData, handleChange }) => {
    const [showInfoStates, setShowInfoStates] = useState<Record<string, boolean>>(
        AudioVideoCommunicationFeatures.reduce((acc, feature) => {
            acc[feature.name] = false;
            return acc;
        }, {} as Record<string, boolean>)
    );

    const toggleShowInfo = (featureName: string) => {
        setShowInfoStates(prevState => ({
            ...prevState,
            [featureName]: !prevState[featureName],
        }));
    };

    return (
        <div>
            <h1 className="text-[16px] mb-2 mt-2">AUDIO, VIDEO, KOMMUNIKATSIOON</h1>
            <div className="grid grid-cols-2 text-[12px]">
                {AudioVideoCommunicationFeatures.map((feature) => {
                    return (
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
                                {feature.name && (
                                    <button
                                        type="button"
                                        onClick={() => toggleShowInfo(feature.name)}
                                        className="ml-2 text-blue-600"
                                    >
                                        +
                                    </button>
                                )}
                            </label>
                            {showInfoStates[feature.name] && (
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
                    );
                })}
            </div>
        </div>
    );
};

export default AudioVideoCommunication;
