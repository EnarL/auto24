import { useEffect, useState } from 'react';
import { useAuthUser } from '@/app/context/AuthUserContext';

const useAuth = () => {
    const { setIsLoggedIn } = useAuthUser();
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/check-session', {
                method: 'GET',
                credentials: 'include', // Ensures cookies are sent
            });

            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return { loading };
};

export default useAuth;
