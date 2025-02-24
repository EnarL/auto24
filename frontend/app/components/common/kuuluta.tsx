"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/app/context/AuthUserContext';

const Kuuluta: React.FC = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuthUser();

    const handleClick = () => {

        if (isLoggedIn) {
            router.push('/users/kuuluta');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col">
            <div
                className="text-white pl-2 text-l bg-[#06c] cursor-pointer"
                onClick={handleClick}
            >
                kuuluta
            </div>
            <div className="bg-[#06c] h-[2px] mt-[1px] lg:hidden"></div>
        </div>
    );
};

export default Kuuluta;
