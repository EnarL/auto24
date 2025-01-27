import React from 'react';

interface InteriorFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InteriorFeatures: React.FC<InteriorFeaturesProps> = ({ formData, handleChange }) => {
    const interiorFeatures = [
        { name: "decorativeTrim", label: "Iluliistud salongis" },
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
            <h2 className="text-lg font-semibold mb-4">SISUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {interiorFeatures.map((feature) => (
                    <label
                        key={feature.name}
                        className="flex items-center bg-gray-50 p-2 border-b border-gray-200"
                    >
                        <input
                            type="checkbox"
                            name={feature.name}
                            checked={formData[feature.name]}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        {feature.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default InteriorFeatures;
