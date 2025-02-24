import React from 'react';

const kuuluta: React.FC = () => {
    return (
        <div className="flex flex-col">
            <div className="text-white pl-2 text-l bg-[#06c] hidden lg:block">kuuluta</div>
            <div className="bg-[#06c] h-[2px] mt-[1px] lg:hidden"></div>
        </div>
    );
};

export default kuuluta;