"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/app/context/AuthUserContext';

const AddListing: React.FC = () => {
    const router = useRouter();
    const { isLoggedIn } = useAuthUser();

    const handleClick = () => {
        if (isLoggedIn) {
            router.push('/users/add_listing');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleClick}
                className="hidden md:flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full px-6 py-3 shadow-lg transition-all duration-300 transform hover:scale-105"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                <span className="text-lg">Kuuluta</span>
            </button>

            {/* Mobile indicator line */}
            <div className="h-1 w-3/4 bg-gray-300 rounded-full mt-4 lg:hidden"></div>
        </div>
    );
};

export default AddListing;