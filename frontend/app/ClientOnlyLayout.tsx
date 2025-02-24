"use client";
import React, { useState, useEffect } from "react";
import { useAuthUser } from "@/app/context/AuthUserContext";
import useTokenRefresh from "@/app/hooks/useRefreshToken";

const ClientOnlyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { loading } = useAuthUser();
    const [isClient, setIsClient] = useState(false);

    useTokenRefresh(); // Call the token refresh hook

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
