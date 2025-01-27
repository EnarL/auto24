import React from 'react';

interface AudioVideoCommunicationProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AudioVideoCommunication: React.FC<AudioVideoCommunicationProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">AUDIO, VIDEO, KOMMUNIKATSIOON</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {[
                    { name: "stereo", label: "Stereo" },
                    { name: "amplifier", label: "Helivõimendi" },
                    { name: "speakers", label: "Kõlarid" },
                    { name: "subwoofer", label: "Subwoofer" },
                    { name: "cdBox", label: "CD Box" },
                    { name: "appleCarPlay", label: "Apple CarPlay" },
                    { name: "androidAuto", label: "Android Auto" },
                    { name: "dvd", label: "DVD" },
                    { name: "electricAntenna", label: "Elektriline antenn" },
                    { name: "screen", label: "Ekraan" },
                    { name: "navigationSystem", label: "Navigatsiooniseade" },
                    { name: "carComputer", label: "Autokompuuter" },
                    { name: "carPhone", label: "Autotelefon" },
                    { name: "handsFreeSystem", label: "Käed vabad süsteem" },
                    { name: "gsmAntenna", label: "GSM antenn" }
                ].map((item) => (
                    <label
                        key={item.name}
                        className="flex items-center bg-gray-50 p-2 border-b border-gray-200"
                    >
                        <input
                            type="checkbox"
                            name={item.name}
                            checked={formData[item.name]}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default AudioVideoCommunication;
