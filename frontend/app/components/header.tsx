import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-100 text-black p-2 font-light">
            <div className="container mx-8 flex">
                <a href="/login" className="hover:text-blue-600">logi sisse</a>
            </div>
        </header>
    );
};

export default Header;