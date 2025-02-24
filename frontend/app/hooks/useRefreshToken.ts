"use client";
import { useEffect } from "react";
import { useAuthUser } from "@/app/context/AuthUserContext";

const useTokenRefresh = () => {
    const { setAccessToken, setTokenExpiration } = useAuthUser();

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const response = await fetch("http://localhost:8080/auth/refresh-token", {
                    method: "POST",
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setAccessToken(data.accessToken);
                    setTokenExpiration(Date.now() + data.expiresIn * 1000);
                } else {
                    console.error("Failed to refresh token, logging out...");
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
            }
        };
        const interval = setInterval(() => {
            refreshAccessToken();
        }, 9 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default useTokenRefresh;
