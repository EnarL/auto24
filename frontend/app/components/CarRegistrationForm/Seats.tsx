import React from 'react';
import CheckboxList from '@/app/components/CheckboxList';

interface SeatsProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Seats: React.FC<SeatsProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">ISTMED</h2>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.seats} parent="seats" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default Seats;