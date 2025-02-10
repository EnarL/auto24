// app/context/AuthUserContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthUserContextType {
    isLoggedIn: boolean;
    username: string | null;
    setIsLoggedIn: (loggedIn: boolean) => void;
    setUsername: (username: string) => void;
}

const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

export const useAuthUser = (): AuthUserContextType => {
    const context = useContext(AuthUserContext);
    if (!context) {
        throw new Error('useAuthUser must be used within an AuthUserProvider');
    }
    return context;
};

export const AuthUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    return (
        <AuthUserContext.Provider value={{ isLoggedIn, username, setIsLoggedIn, setUsername }}>
            {children}
        </AuthUserContext.Provider>
    );
};
