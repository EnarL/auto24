import { useEffect } from 'react';
import { useAuthUser } from "@/app/context/AuthUserContext";

const useTokenRefresh = () => {
    const { setAccessToken } = useAuthUser(); // Access context here

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/refresh-token', {
                    method: 'POST',
                    credentials: 'include',
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.href = '/login';
                    }
                    throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error("Error refreshing access token:", error);
            }
        };

        const intervalId = setInterval(refreshAccessToken, 9 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [setAccessToken]);
};

export default useTokenRefresh;
