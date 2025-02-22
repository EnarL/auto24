import React from 'react';
import CheckboxList from '@/app/components/CheckboxList';

interface SafetyEquipmentProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const SafetyEquipment: React.FC<SafetyEquipmentProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">TURVA- JA OHUTUSVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                <CheckboxList info={formData.safetyAndSecurity} parent="safetyAndSecurity" handleChange={handleChange} />
            </div>
        </div>
    );
};

export default SafetyEquipment;