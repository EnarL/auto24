"use client";
import { useEffect } from "react";

const useTokenRefresh = () => {
    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
                    method: "POST",
                    credentials: "include",
                });

                if (!response.ok) {
                    console.error("Failed to refresh token, logging out...");
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
            }
        };
        refreshAccessToken();

        // Set interval to refresh the token every 8 minutes
        const interval = setInterval(refreshAccessToken, 8 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default useTokenRefresh;
