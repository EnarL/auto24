import React from 'react';

interface SearchSectionProps {
    className?: string;
}

const Searchsection: React.FC<SearchSectionProps> = ({ className }) => {
    return (
        <div className={`mx-left ${className}`}>
            <h1 className="text-[18px] mb-2 w-full font-sans opacity-60">MINU OTSINGUD</h1>
            <div className="w-[95%] search-section bg-blue-50 p-4">
                <p className="text-[14px] opacity-80">Siia ilmuvad sinu otsingutulemused</p>
                <p className="opacity-65 text-[14px]">Nii saad mugavalt soovitud kuulutustega kursis olla </p>
            </div>
        </div>
    );
};

export default Searchsection;