"use client"; // Mark this file as a Client Component

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthUserContextType {
    isLoggedIn: boolean;
    username: string;
    firstname: string;
    lastname: string;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setUsername: (username: string) => void;
    setFirstname: (firstname: string) => void;
    setLastname: (lastname: string) => void;
}

const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

export const AuthUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        const storedUsername = Cookies.get('username');
        const storedFirstname = Cookies.get('firstname');
        const storedLastname = Cookies.get('lastname');

        if (accessToken && refreshToken) {
            setIsLoggedIn(true);
            if (storedUsername) setUsername(storedUsername);
            if (storedFirstname) setFirstname(storedFirstname);
            if (storedLastname) setLastname(storedLastname);
        }
    }, []); // Empty dependency array to run only once on component mount

    return (
        <AuthUserContext.Provider
            value={{
                isLoggedIn,
                username,
                firstname,
                lastname,
                setIsLoggedIn,
                setUsername,
                setFirstname,
                setLastname,
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
