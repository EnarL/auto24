import React from "react";

interface FormInputProps {
    id: string;
    label: string;
    value: string | null; // Allow null here to handle the case where value might be null
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 id,
                                                 label,
                                                 value,
                                                 onChange,
                                                 type = "text",
                                                 className = ""
                                             }) => {
    return (
        <div className="mb-2 flex items-center">
            <label className={`block text-gray-700 text-[12px] flex-none w-[120px] ${className}`} htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={`border border-gray-300 w-full text-[12px] p-2 ${className}`}
                value={value || ""} // Use empty string if value is null
                onChange={onChange}
            />
        </div>
    );
};

export default FormInput;
