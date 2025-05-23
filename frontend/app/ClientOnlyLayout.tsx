"use client";
import React, { useState, useEffect } from "react";
import { useAuthUser } from "@/app/context/AuthUserContext";
import useTokenRefresh from "@/app/hooks/useRefreshToken";

const ClientOnlyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { loading, initialized } = useAuthUser();
    const [isClient, setIsClient] = useState(false);

    // Only initialize token refresh after auth is initialized
    useTokenRefresh();

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Show loading until client is ready and auth is initialized
    if (!isClient || !initialized || loading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ClientOnlyLayout;