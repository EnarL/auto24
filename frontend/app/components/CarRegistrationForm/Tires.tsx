import React from 'react';
import CheckboxList from '@/app/components/CheckboxList';

interface TiresProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const Tires: React.FC<TiresProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">REHVID JA VELJED</h2>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.tiresAndWheels} parent="tiresAndWheels" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default Tires;