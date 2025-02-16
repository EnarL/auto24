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
        <div className="mb-4 flex items-center">
            <label className="block mx-auto text-gray-700 text-[12px]" htmlFor={id}>
                {label}
            </label>
            <input type="checkbox" id={id} checked={checked} onChange={onChange} />
        </div>
    );
};

export default CheckboxInput;
