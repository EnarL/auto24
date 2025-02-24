import React from 'react';
import CheckboxList from '@/app/components/CheckboxList';

interface AdditionalFeaturesProps {
    formData: Record<string, any>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const AdditionalFeatures: React.FC<AdditionalFeaturesProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h1 className="text-[16px] mb-2 mt-2">MUU VARUSTUS</h1>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.additionalFeatures} parent="additionalFeatures" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default AdditionalFeatures;