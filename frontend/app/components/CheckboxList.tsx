import React, { useState, useEffect } from "react";

interface CheckboxListProps {
    info: Record<string, any> | undefined;
    parent: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ info, parent, handleChange }) => {
    const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (info) {
            setVisibleFields(prevState => {
                const newState = { ...prevState };

                Object.keys(info).forEach((key) => {
                    if (info[`${key}Lisainfo`] !== undefined && !(key in prevState)) {
                        newState[`${parent}.${key}Lisainfo`] = prevState[`${parent}.${key}Lisainfo`] ?? false;
                    }
                });

                return newState;
            });
        }
    }, [info, parent]);


    const toggleVisibility = (key: string) => {
        setVisibleFields((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const renderCheckboxList = (info: Record<string, any> | undefined, parent: string) => {
        if (!info) return null;

        return Object.entries(info).map(([key, value]) => {
            if (key.endsWith("Lisainfo")) return null; // Prevent rendering checkboxes for text fields

            return (
                <div key={key} className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name={`${parent}.${key}`}
                            checked={!!value} // Ensure boolean check
                            onChange={handleChange}
                            className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                        />
                        {key.replace(/([A-Z])/g, " $1")}
                        {info[`${key}Lisainfo`] !== undefined && (
                            <button
                                type="button"
                                onClick={() => toggleVisibility(`${parent}.${key}Lisainfo`)}
                                className="ml-2 text-blue-500"
                            >
                                {visibleFields[`${parent}.${key}Lisainfo`] ? "-" : "+"}
                            </button>
                        )}
                    </label>

                    {info[`${key}Lisainfo`] !== undefined && visibleFields[`${parent}.${key}Lisainfo`] && (
                        <input
                            type="text"
                            name={`${parent}.${key}Lisainfo`}
                            value={info[`${key}Lisainfo`] || ""}
                            onChange={handleChange}
                            className="mt-2 p-1 border border-gray-300"
                        />
                    )}
                </div>
            );
        });
    };

    return <>{renderCheckboxList(info, parent)}</>;
};

export default CheckboxList;
