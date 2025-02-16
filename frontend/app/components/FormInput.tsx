import React from "react";

interface FormInputProps {
    id: string;
    label: string;
    value: string;
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
            <label className={`block text-gray-700 mx-auto w-[150px] text-[12px] ${className}`} htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={`border border-gray-300 w-[300px] ${className}`}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FormInput;
