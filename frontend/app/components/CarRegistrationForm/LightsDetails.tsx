import React from 'react';
import CheckboxList from '@/app/components/CarRegistrationForm/CheckboxList';
import { Lights as LightsType } from '@/app/types/types';
interface LightsDetailsProps {
    formData: { lights: LightsType };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const LightsDetails: React.FC<LightsDetailsProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">TULED</h2>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.lights} parent="lights" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default LightsDetails;