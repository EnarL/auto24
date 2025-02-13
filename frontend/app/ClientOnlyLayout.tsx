'use client';

import { useAuthUser } from "@/app/context/AuthUserContext";
import { useState, useEffect } from "react";
import "./globals.css"; // Import the CSS file for the spinner

const ClientOnlyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { loading } = useAuthUser(); // Get loading state from AuthUserContext
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Ensure client-side execution
    }, []);

    if (!isClient || loading) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <div className="spinner"></div> {/* Show spinner */}
            </div>
        );
    }

    return <>{children}</>; // Render the layout when ready
};

export default ClientOnlyLayout;
