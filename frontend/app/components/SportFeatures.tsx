import React from 'react';

interface SportFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SportFeatures: React.FC<SportFeaturesProps> = ({ formData, handleChange }) => {
    // List of sport feature options
    const sportFeatures = [
        { name: "rearSpoiler", label: "Tagaspoiler" },
        { name: "frontSpoiler", label: "Esispoiler" },
        { name: "spoilerKit", label: "Spoileriring" },
        { name: "sportSuspension", label: "Sportvedrustus" },
        { name: "sportExhaust", label: "Sportsummuti" },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">SPORTVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {sportFeatures.map((item) => (
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

export default SportFeatures;
