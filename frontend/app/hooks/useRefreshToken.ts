"use client";
import { useEffect, useRef } from "react";
import { useAuthUser } from "@/app/context/AuthUserContext";

const useTokenRefresh = () => {
    const { isLoggedIn, initialized, logout } = useAuthUser();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Only start token refresh after auth is initialized and user is logged in
        if (!initialized || !isLoggedIn) {
            // Clear any existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        const refreshAccessToken = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
                    method: "POST",
                    credentials: "include",
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        console.error("Token refresh failed - logging out user");
                        await logout();
                    } else {
                        console.error("Token refresh failed:", response.status);
                    }
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
            }
        };

        // Initial refresh
        refreshAccessToken();

        // Set interval to refresh the token every 8 minutes
        intervalRef.current = setInterval(refreshAccessToken, 8 * 60 * 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isLoggedIn, initialized, logout]);

    return null;
};

export default useTokenRefresh;