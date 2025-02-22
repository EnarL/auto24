import React from 'react';
import CheckboxList from '@/app/components/CheckboxList';

interface SportFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const SportFeatures: React.FC<SportFeaturesProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">SPORTVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.sportFeatures} parent="sportFeatures" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default SportFeatures;