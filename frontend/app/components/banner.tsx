import React from 'react';

interface BannerProps {
    className?: string;
}

const Banner: React.FC<BannerProps> = ({ className }) => {
    return (
        <div className={`banner ${className}`}>
            <img
                src="https://reklaam.auto24.ee/images/b08b6d79e823c423975c2b17e6a481e3.jpg"
                alt="Banner"
                className="w-full h-auto"
            />
        </div>
    );
};

export default Banner;