import React from 'react';

const FooterSection: React.FC = () => {
    const websites = [
        { url: "https://auto24.ee", name: "auto24.ee" },
        { url: "https://www.kv.ee/", name: "kv.ee" },
        { url: "https://www.osta.ee/", name: "osta.ee" },
        { url: "https://getapro.ee/", name: "GetaPro.ee" },
        { url: "https://www.kuldnebors.ee/", name: "KuldneBörs.ee" },
        { url: "https://www.city24.ee/", name: "City24.ee" },
        { url: "https://getapro.lv/", name: "GetaPro.lv" },
        { url: "https://www.city24.lv/", name: "City24.lv" },
        { url: "https://www.aruodas.lt/", name: "Aruodas.lt" },
        { url: "https://www.skelbiu.lt/", name: "Skelbu.lt" },
        { url: "https://autoplius.lt/", name: "autoplius.lt" },
        { url: "https://www.cvbankas.lt/", name: "CVBankas.lt" },
        { url: "https://www.kainos.lt/", name: "Kainos.lt" },
        { url: "https://paslaugos.lt/", name: "Paslaugos.lt" }
    ];

    return (
        <footer className="flex items-center">
            <div className="mx-auto flex items-center w-[1000px]">
                <a href="https://balticclassifieds.com/" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://www.auto24.ee/images/logo/BCG.svg"
                        alt="Placeholder"
                        className="w-36 p-4"
                    />
                </a>
                <div className="grid grid-rows-2 grid-flow-col gap-2 h-full ml-4">
                    {websites.map((link, index) => (
                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[12px]">
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;