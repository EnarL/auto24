import React from 'react';
import { vehicleFields } from '@/app/data/labels';

interface VehicleDetailsProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h1 className="text-xl mb-2 mt-2">Sõiduki andmed</h1>
            <div className="border-l-4 border-gray-300 p-4 bg-gray-50 text-[12px] flex flex-col">
                <p>
                    Palume sõiduki
                    <span className="font-bold whitespace-pre"> liigi, margi, mudeli ja esmase reg aja </span>
                    määramisel olla tähelepanelik, sest nende väljade muutmine pärast kuulutuse aktiveerimist ei ole
                    võimalik.
                </p>
                <p>
                    Kuulutuse algset objekti ei või asendada mõne teise objektiga.
                </p>
            </div>
            {vehicleFields.map((field) => {
                return (
                    <div className="flex items-center gap-4 mb-2 text-[12px]" key={field.name}>
                        <label className="text-right bg-gray-100 px-1 py-1 w-[250px] font-bold">
                            {field.label}
                        </label>
                        {field.type === "checkbox" ? (
                            <input
                                type="checkbox"
                                name={field.name}
                                checked={formData[field.name]}
                                onChange={handleChange}
                                className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none"
                            />
                        ) : field.type === "textarea" ? (
                            <textarea
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-[300px] border border-gray-300 px-2 py-1 resize-none h-[80px] focus:border-blue-600 focus:outline-none"
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-[300px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none mr-2"
                                readOnly={field.readOnly || false}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default VehicleDetails;
