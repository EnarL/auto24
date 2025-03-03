import React from 'react';
import CheckboxList from '@/app/components/CarRegistrationForm/CheckboxList';
import {Interior as InteriorFeaturesType} from "@/app/types/types";

interface InteriorFeaturesProps {
    formData: { interiorFeatures: InteriorFeaturesType };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const InteriorFeatures: React.FC<InteriorFeaturesProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">SISUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.interiorFeatures} parent="interiorFeatures" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default InteriorFeatures;