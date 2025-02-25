import React from 'react';

const Field: React.FC<{
    field: { name: string; label: string; type: string };
    value: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}> = ({ field, value, handleChange }) => {
    return (
        <div className="flex items-center gap-4 mb-2 text-[12px]">
            <label htmlFor={field.name} className="text-right bg-gray-100 px-1 py-1 w-[250px] font-bold">
                {field.label}
            </label>
            {field.type === "checkbox" ? (
                <input
                    type="checkbox"
                    name={field.name}
                    checked={Boolean(value)}
                    onChange={handleChange}
                    className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none"
                    id={field.name}
                />
            ) : field.type === "textarea" ? (
                <textarea
                    name={field.name}
                    value={value || ""}
                    onChange={handleChange}
                    className="w-[300px] border border-gray-300 px-2 py-1 resize-none h-[80px] focus:border-blue-600 focus:outline-none"
                    id={field.name}
                />
            ) : (
                <input
                    type={field.type}
                    name={field.name}
                    value={value || ""}
                    onChange={handleChange}
                    className="w-[300px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none mr-2"
                    id={field.name}
                />
            )}
        </div>
    );
};

export default Field;
