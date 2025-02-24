import React from 'react';
import { vehicleFields } from "@/app/data/labels"; // Ensure this path is correct
import Field from "@/app/components/VehicleDetailsFields"; // Ensure this path is correct

export interface VehicleDetailsProps {
    formData: Record<string, any>;
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
                const value = field.name.includes('.')
                    ? field.name.split('.').reduce((o, i) => o[i], formData)
                    : formData[field.name] || '';

                return (
                    <Field key={field.name} field={field} value={value} handleChange={handleChange} />
                );
            })}
        </div>
    );
};

export default VehicleDetails;
