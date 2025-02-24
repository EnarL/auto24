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
        <div className="mb-2 flex items-center"> {/* Flex container for alignment */}
            <label className={`block text-gray-700 text-[12px] flex-none w-[120px] ${className}`} htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                className={`border border-gray-300 w-full text-[12px] ${className}`} // Full width for input
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default FormInput;
