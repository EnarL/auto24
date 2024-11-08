import Image from "next/image";
import auto24 from "@/public/auto24.svg";
import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
    return (
        <div className="pl-8">
            <Link href="/">
                <Image src={auto24} alt="247" className="w-40 h-20" />
            </Link>
        </div>
    );
};

export default Logo;