import React from 'react';
import CheckboxList from '@/app/components/CarRegistrationForm/CheckboxList';
import { Comfort as ComfortFeaturesType } from '@/app/types/types';

interface FeaturesProps {
    formData: { comfortFeatures: ComfortFeaturesType };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const ComfortFeatures: React.FC<FeaturesProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">MUGAVUSVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.comfortFeatures} parent="comfortFeatures" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default ComfortFeatures;