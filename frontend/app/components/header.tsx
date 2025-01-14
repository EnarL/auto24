import React from 'react';

const Header: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <header className={`bg-gray-100 p-2 opacity-80 mb-1 ${className}`}>
            <div className="mx-auto flex flex-col text-[12px] w-full max-w-custom">
                <a href="/login" className="hover:text-blue-600">Logi sisse</a>
            </div>
        </header>
    );
};

export default Header;