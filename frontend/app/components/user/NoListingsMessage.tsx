// components/common/NoListingsMessage.tsx
"use client";
import React from "react";
import Link from "next/link";

const NoListingsMessage: React.FC = () => {
    return (
        <div className="border-l-4 border-[#91d5ff] mt-4 ml-[10px] w-[740px] text-[#06c] mx-auto p-3 bg-[#f2faff] text-[14px] flex items-center">
            <img src="https://www.auto24.ee/images/icons/msg/info.svg" alt="Info" className="mr-2" />
            <span>Teil ei ole praegu sisestatud ühtegi kuulutust. </span>
            <Link href="#" className="underline ml-1">Sisesta kuulutus</Link>
        </div>
    );
};

export default NoListingsMessage;