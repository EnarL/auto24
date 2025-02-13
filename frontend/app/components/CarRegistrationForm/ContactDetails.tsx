import React from 'react';
import { contactFields } from '@/app/data/labels';

interface ContactDetailsProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ContactDetails: React.FC<ContactDetailsProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h1 className="text-xl mb-2">Kontaktandmed kuulutuse juurde</h1>
            <div className="space-y-2">
                {contactFields.map((field) => (
                    <div key={field.name} className="flex items-center gap-4 text-[12px]">
                        <label
                            className="bg-gray-100 px-1 py-1 text-right w-[250px] font-bold"
                        >
                            {field.label} {field.required && <span className="text-red-600">*</span>}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                            readOnly={field.readOnly}
                            className="w-[300px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none mr-2"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactDetails;
