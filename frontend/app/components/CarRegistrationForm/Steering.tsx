import React from 'react';
import CheckboxList from '@/app/components/CarRegistrationForm/CheckboxList';
import { Steering as SteeringType } from '@/app/types/types';
interface SteeringProps {
    formData: { steering: SteeringType };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Steering: React.FC<SteeringProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">ROOL</h2>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.steering} parent="steering" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default Steering;