'use client';

import { useAuthUser } from "@/app/context/AuthUserContext";
import React, { useState, useEffect } from "react";
import useTokenRefresh from "@/app/hooks/useRefreshToken";
import "./globals.css";

const ClientOnlyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { loading } = useAuthUser();
    const [isClient, setIsClient] = useState(false);

    useTokenRefresh(); // Use the hook here

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || loading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ClientOnlyLayout;