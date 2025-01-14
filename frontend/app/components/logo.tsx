import Image from "next/image";
import auto24 from "@/public/auto24.svg";
import Link from "next/link";
import React from "react";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={` ${className}`}>
            <Link href="/">
                <Image src={auto24} alt="247" className="w-40 h-20 logo-details" />
            </Link>
        </div>
    );
};

export default Logo;