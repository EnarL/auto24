import React from 'react';

interface TiresProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Tires: React.FC<TiresProps> = ({ formData, handleChange }) => {
    // List of tire-related feature options
    const tireFeatures = [
        { name: "summerTires", label: "Suverehvid" },
        { name: "winterTires", label: "Talverehvid" },
        { name: "alloyWheels", label: "Valuveljed" },
        { name: "hubcaps", label: "Ilukilbid" },
        { name: "spareTire", label: "Tagavararatas" },
        { name: "tirePressureMonitoring", label: "Rehvirõhu kontrollsüsteem" },
        { name: "summerTiresIncluded", label: "Autoga antakse kaasa suverehvid" },
        { name: "winterTiresIncluded", label: "Autoga antakse kaasa talverehvid" },
        { name: "alloyWheelsIncluded", label: "Autoga antakse kaasa valuveljed" },
        { name: "hubcapsIncluded", label: "Autoga antakse kaasa ilukilbid" }
    ];

    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">REHVID JA VELJED</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {tireFeatures.map((item) => (
                    <label
                        key={item.name}
                        className="flex items-center bg-gray-50 p-2 border-b border-gray-200"
                    >
                        <input
                            type="checkbox"
                            name={item.name}
                            checked={formData[item.name]}
                            onChange={handleChange}
                            className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Tires;
