import React from 'react';

interface SteeringProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Steering: React.FC<SteeringProps> = ({ formData, handleChange }) => {
    // List of steering feature options
    const steeringFeatures = [
        { name: "adjustableSteeringColumn", label: "Reguleeritav roolisammas" },
        { name: "multifunctionSteeringWheel", label: "Multifunktsionaalne rool" },
        { name: "leatherSteeringWheel", label: "Nahkkattega rool" },
        { name: "sportSteeringWheel", label: "Sportrool" },
        { name: "heatedSteeringWheel", label: "Soojendusega rool" },
        { name: "paddleShifters", label: "Käiguvahetus roolilt" },
        { name: "rightHandDrive", label: "Parempoolne rool (vasakpoolne liiklus)" },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">ROOL</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {steeringFeatures.map((item) => (
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

export default Steering;
