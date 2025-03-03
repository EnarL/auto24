import React from "react";

interface CheckboxInputProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
                                                         id,
                                                         label,
                                                         checked,
                                                         onChange,
                                                     }) => {
    return (
        <div className="flex items-center justify-between">
            <label className="text-gray-700 text-[12px] p-2" htmlFor={id}>
                {label}
            </label>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="ml-2"
            />
        </div>
    );
};

export default CheckboxInput;
