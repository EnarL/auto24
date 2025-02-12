import React from 'react';
import { SafetyEquipmentFeatures } from '../data/labels'; // Import the array from the external file

interface SafetyEquipmentProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SafetyEquipment: React.FC<SafetyEquipmentProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">TURVA- JA OHUTUSVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {SafetyEquipmentFeatures.map((item) => (
                    <label
                        key={item.name}
                        className="flex items-center bg-gray-50 p-2 border-b border-gray-200"
                    >
                        <input
                            type="checkbox"
                            name={item.name}
                            checked={formData[item.name]}
                            onChange={handleChange}
                            className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2 "
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default SafetyEquipment;
