"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthUserContextType {
    isLoggedIn: boolean;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    newsletter: boolean;
    active: boolean;
    phoneNumber: string;
    loading: boolean;
    initialized: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUsername: (username: string) => void;
    setFirstname: (firstname: string) => void;
    setLastname: (lastname: string) => void;
    setNewsletter: (newsletter: boolean) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setEmail: (email: string) => void;
    setActive: (active: boolean) => void;
    updateUserData: () => void;
    logout: () => Promise<void>;
}

const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

export const AuthUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [active, setActive] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);
    const router = useRouter();

    // Replace the initializeAuth function in AuthUserContext.tsx

    const initializeAuth = async () => {
        if (initialized) return;

        try {
            // Check if user has valid session on startup
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-session`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                // User has valid session, set logged in and fetch user data
                setIsLoggedIn(true);
                await fetchUserDataOnly();
            } else {
                // No valid session, ensure clean state
                clearUserData();
            }
        } catch (error) {
            console.error("Initial auth check failed:", error);
            clearUserData();
        } finally {
            setLoading(false);
            setInitialized(true);
        }
    };

// Also modify checkAuthStatus to remove the early return
    const checkAuthStatus = async () => {
        // Remove this early return check:
        // if (!isLoggedIn) {
        //     setLoading(false);
        //     return;
        // }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-session`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                setIsLoggedIn(true);
                await fetchUserDataOnly();
            } else {
                clearUserData();
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            clearUserData();
        } finally {
            setLoading(false);
        }
    };

    // Fetch user data without session check
    const fetchUserDataOnly = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setUsername(data.username);
                setFirstname(data.firstname);
                setLastname(data.lastname);
                setEmail(data.email);
                setNewsletter(data.newsletter);
                setActive(data.active);
                setPhoneNumber(data.phoneNumber);
            } else {
                console.info("Failed to fetch user data");
                clearUserData();
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            clearUserData();
        }
    };

    const clearUserData = () => {
        setIsLoggedIn(false);
        setUsername('');
        setFirstname('');
        setLastname('');
        setEmail('');
        setNewsletter(false);
        setActive(false);
        setPhoneNumber('');
    };

    // Public function for manual user data refresh
    const fetchUserData = async () => {
        if (!isLoggedIn) {
            console.log("User is not authenticated, skipping user data fetch.");
            return;
        }
        await fetchUserDataOnly();
    };

    const logout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            // Clear data regardless of response to ensure clean state
            clearUserData();

            if (response.ok) {
                router.push("/login");
            } else {
                console.error("Logout request failed, but user data cleared");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            // Still clear user data even if request fails
            clearUserData();
        }
    };

    const setIsLoggedInWithData = (loggedIn: boolean) => {
        setIsLoggedIn(loggedIn);
        if (!loggedIn) {
            clearUserData();
        }
    };

    // Initialize auth on mount
    useEffect(() => {
        initializeAuth();
    }, []);

    // Check auth status when isLoggedIn changes
    useEffect(() => {
        if (initialized) {
            checkAuthStatus();
        }
    }, [isLoggedIn, initialized]);

    return (
        <AuthUserContext.Provider
            value={{
                isLoggedIn,
                username,
                firstname,
                lastname,
                email,
                newsletter,
                active,
                phoneNumber,
                loading,
                initialized,
                setIsLoggedIn: setIsLoggedInWithData,
                setUsername,
                setFirstname,
                setLastname,
                setEmail,
                setNewsletter,
                setActive,
                setPhoneNumber,
                updateUserData: fetchUserData,
                logout,
            }}
        >
            {children}
        </AuthUserContext.Provider>
    );
};

export const useAuthUser = (): AuthUserContextType => {
    const context = React.useContext(AuthUserContext);
    if (!context) {
        throw new Error('useAuthUser must be used within an AuthUserProvider');
    }
    return context;
};