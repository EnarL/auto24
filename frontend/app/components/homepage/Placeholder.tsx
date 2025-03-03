import React from 'react';

const Placeholder: React.FC = () => {
    return (
        <div className="placeholder" style={{ width: '740px', height: '250px' }}>
            <img
                src="https://reklaam.auto24.ee/images/985481c5e3baa9ea57b7d112933603b4.jpg"
                alt="Placeholder"
                className="w-full h-full object-cover hidden md:block"
            />
        </div>
    );
};

export default Placeholder;