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
    const router = useRouter();

    const fetchUserData = async () => {
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
                setIsLoggedIn(true);
            } else {
                console.info("User is not logged in");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setIsLoggedIn(false);
                setUsername("");
                setFirstname("");
                setLastname("");
                router.push("/login");
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [router]);

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
                setIsLoggedIn,
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
