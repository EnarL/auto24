"use client";

import React from "react";
import UserLayout from "@/app/components/UserLayout";
import Link from "next/link";

const FirmadTeenusedPage: React.FC = () => {
    return (
        <UserLayout activeTab="Firmad ja teenused">
            <div className="border-l-4 border-[#91d5ff] mt-4 ml-[10px] w-[740px] text-[#06c] mx-auto p-3 bg-[#f2faff] text-[14px] flex items-center">
                <img src="https://www.auto24.ee/images/icons/msg/info.svg" alt="Info" className="mr-2" />
                <span>Teil ei ole praegu sisestatud ühtegi kuulutust.</span>
                <Link href="/users/kuuluta" className="underline ml-1">Sisesta kuulutus</Link>
            </div>
        </UserLayout>
    );
};

export default FirmadTeenusedPage;
