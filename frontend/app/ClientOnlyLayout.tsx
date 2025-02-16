'use client';

import { useAuthUser } from "@/app/context/AuthUserContext";
import { useState, useEffect } from "react";
import "./globals.css";

const ClientOnlyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { loading } = useAuthUser(); // Get loading state from AuthUserContext
    const [isClient, setIsClient] = useState(false);

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
