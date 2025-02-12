import React from 'react';
import { tiresFeatures } from '../data/labels';

interface TiresProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Tires: React.FC<TiresProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">REHVID JA VELJED</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {tiresFeatures.map((item) => (
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
