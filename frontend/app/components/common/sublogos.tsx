import React from 'react';

const Sublogos: React.FC = () => {
    const logos = [
        { src: "https://img.auto24.ee/images/header/logo_mototehnika_r.png", link: "https://mototehnika.ee" },
        { src: "https://img.auto24.ee/images/header/logo_rasketehnika_r.png", link: "https://rasketehnika.ee" },
        { src: "https://img.auto24.ee/images/header/logo_veetehnika_r.png", link: "https://veetehnika.ee" },
        { src: "https://img.auto24.ee/images/header/logo_kb_r.png", link: "https://www.kuldnebors.ee/" }
    ];

    return (
        <div className="sublogos flex ml-auto">
            {logos.map((logo, index) => (
                <a key={index} href={logo.link} target="_blank" rel="noopener noreferrer">
                    <img
                        src={logo.src}
                        alt={`Logo ${index + 1}`}
                        className="h-auto w-32"
                    />
                </a>
            ))}
        </div>
    );
};

export default Sublogos;