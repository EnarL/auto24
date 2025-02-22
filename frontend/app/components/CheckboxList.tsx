import React, { useState } from 'react';

interface CheckboxListProps {
    info: Record<string, any> | undefined;
    parent: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ info, parent, handleChange }) => {
    const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});

    const toggleVisibility = (key: string) => {
        setVisibleFields(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const renderCheckboxList = (info: Record<string, any> | undefined, parent: string) => {
        if (!info) return null;
        return Object.entries(info).map(([key, value], index) => {
            if (typeof value === 'boolean') {
                return (
                    <div key={index} className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name={`${parent}.${key}`}
                                checked={value}
                                onChange={handleChange}
                                className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                            />
                            {key.replace(/([A-Z])/g, ' $1')}
                            {info[`${key}Lisainfo`] !== undefined && (
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility(`${parent}.${key}Lisainfo`)}
                                    className="ml-2 text-blue-500"
                                >
                                    +
                                </button>
                            )}
                        </label>
                        {info[`${key}Lisainfo`] !== undefined && visibleFields[`${parent}.${key}Lisainfo`] && (
                            <input
                                type="text"
                                name={`${parent}.${key}Lisainfo`}
                                value={info[`${key}Lisainfo`]}
                                onChange={handleChange}
                                className="mt-2 p-1 border border-gray-300"
                            />
                        )}
                    </div>
                );
            } else if (typeof value === 'string' && key.endsWith('Lisainfo')) {
                return null; // Hide the lisainfo field initially
            }
            return null;
        });
    };

    return <>{renderCheckboxList(info, parent)}</>;
};

export default CheckboxList;