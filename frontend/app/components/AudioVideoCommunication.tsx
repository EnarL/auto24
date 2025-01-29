import React, { useState } from 'react';

interface AudioVideoCommunicationProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AudioVideoCommunication: React.FC<AudioVideoCommunicationProps> = ({ formData, handleChange }) => {
    const [showStereoInfo, setShowStereoInfo] = useState(false);
    const [showAmplifierInfo, setShowAmplifierInfo] = useState(false);
    const [showSpeakersInfo, setShowSpeakersInfo] = useState(false);
    const [showSubwooferInfo, setShowSubwooferInfo] = useState(false);
    const [showCdBoxInfo, setShowCdBoxInfo] = useState(false);
    const [showScreenInfo, setShowScreenInfo] = useState(false);
    const [showCarPhoneInfo, setShowCarPhoneInfo] = useState(false);
    const [showHandsFreeSystemInfo, setShowHandsFreeSystemInfo] = useState(false);

    const features = [
        { name: "stereo", label: "Stereo", showInfo: showStereoInfo, setShowInfo: setShowStereoInfo },
        { name: "amplifier", label: "Helivõimendi", showInfo: showAmplifierInfo, setShowInfo: setShowAmplifierInfo },
        { name: "speakers", label: "Kõlarid", showInfo: showSpeakersInfo, setShowInfo: setShowSpeakersInfo },
        { name: "subwoofer", label: "Subwoofer", showInfo: showSubwooferInfo, setShowInfo: setShowSubwooferInfo },
        { name: "cdBox", label: "CD Box", showInfo: showCdBoxInfo, setShowInfo: setShowCdBoxInfo },
        { name: "appleCarPlay", label: "Apple CarPlay" },
        { name: "androidAuto", label: "Android Auto" },
        { name: "dvd", label: "DVD" },
        { name: "electricAntenna", label: "Elektriline antenn" },
        { name: "screen", label: "Ekraan", showInfo: showScreenInfo, setShowInfo: setShowScreenInfo },
        { name: "navigationSystem", label: "Navigatsiooniseade" },
        { name: "carComputer", label: "Autokompuuter" },
        { name: "carPhone", label: "Autotelefon", showInfo: showCarPhoneInfo, setShowInfo: setShowCarPhoneInfo },
        { name: "handsFreeSystem", label: "Käed vabad süsteem", showInfo: showHandsFreeSystemInfo, setShowInfo: setShowHandsFreeSystemInfo },
        { name: "gsmAntenna", label: "GSM antenn" }
    ];

    return (
        <div>
            <h1 className="text-[16px] mb-2 mt-2">AUDIO, VIDEO, KOMMUNIKATSIOON</h1>
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
                            {(feature.showInfo !== undefined) && (
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

export default AudioVideoCommunication;