import { useEffect } from 'react';
import { useAuthUser } from '@/app/context/AuthUserContext';

const useTokenRefresh = () => {
    const { accessToken, refreshToken, setAccessToken, setIsLoggedIn } = useAuthUser();

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                console.log("Attempting to refresh access token...");
                const response = await fetch('http://localhost:8080/auth/refresh-token', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refreshToken }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Access token refreshed:", data.accessToken);
                    setAccessToken(data.accessToken);
                } else {
                    console.error("Failed to refresh access token");
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Token refresh failed:", error);
                setIsLoggedIn(false);
            }
        };

        const interval = setInterval(() => {
            if (accessToken) {
                refreshAccessToken();
            }
        }, 15 * 60 * 1000); // Refresh token every 15 minutes

        return () => clearInterval(interval);
    }, [accessToken, refreshToken, setAccessToken, setIsLoggedIn]);
};

export default useTokenRefresh;