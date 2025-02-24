"use client";
import React from 'react';
import Sidebar from './Sidebar';
import Tabs from './Tabs';
import { useAuthUser } from '@/app/context/AuthUserContext';
import { useRouter } from 'next/navigation';

const UserLayout: React.FC<{ activeTab: string; children: React.ReactNode }> = ({ activeTab, children }) => {
    const { isLoggedIn } = useAuthUser();
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) return null;

    return (
        <div className="flex">
            <Sidebar activeSection={activeTab} />
            <div className="flex flex-col w-full">
                <Tabs activeTab={activeTab} />
                {children}
            </div>
        </div>
    );
};

export default UserLayout;
