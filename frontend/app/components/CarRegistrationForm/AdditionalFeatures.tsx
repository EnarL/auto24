import React from 'react';
import CheckboxList from '@/app/components/CarRegistrationForm/CheckboxList';
import { additionalFeatures } from '@/app/types/types';

interface AdditionalFeaturesProps {
    formData: { additional: additionalFeatures };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Additional: React.FC<AdditionalFeaturesProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h1 className="text-[16px] mb-2 mt-2">MUU VARUSTUS</h1>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.additional} parent="additional" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default Additional;