import React from 'react';
import { vehicleFields } from "@/app/data/labels";
import Field from "@/app/components/CarRegistrationForm/VehicleDetailsFields";
import { CarDetailsDTO } from '@/app/types/types';

export interface VehicleDetailsProps {
    formData: CarDetailsDTO;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
    return path.split('.').reduce<unknown>((o, i) => (o ? (o as Record<string, unknown>)[i] : ''), obj);
};

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
                    ? getNestedValue(formData, field.name)
                    : formData[field.name as keyof CarDetailsDTO] || '';

                return (
                    <Field key={field.name} field={field} value={value as string | number | boolean | undefined} handleChange={handleChange} />
                );
            })}
        </div>
    );
};

export default VehicleDetails;