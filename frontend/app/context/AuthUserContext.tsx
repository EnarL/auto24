"use client";
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthUserContextType {
    isLoggedIn: boolean;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    newsletter: boolean;
    phoneNumber: string;
    loading: boolean;
    accessToken: string;
    refreshToken: string;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUsername: (username: string) => void;
    setFirstname: (firstname: string) => void;
    setLastname: (lastname: string) => void;
    setNewsletter: (newsletter: boolean) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setEmail: (email: string) => void;
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    updateUserData: () => void;
}
const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

export const AuthUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const router = useRouter();

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:8080/users/me", {
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
                setPhoneNumber(data.phoneNumber);
                setIsLoggedIn(true);
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
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
                phoneNumber,
                loading,
                accessToken,
                refreshToken,
                setIsLoggedIn,
                setUsername,
                setFirstname,
                setLastname,
                setEmail,
                setNewsletter,
                setPhoneNumber,
                setAccessToken,
                setRefreshToken,
                updateUserData: fetchUserData,
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