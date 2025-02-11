"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthUser } from '@/app/context/AuthUserContext';  // Import context
import Cookies from 'js-cookie';
import Link from "next/link";

const Header: React.FC<{ className?: string }> = ({ className }) => {
    const router = useRouter();
    const { isLoggedIn, username, firstname, lastname, setIsLoggedIn, setUsername, setFirstname, setLastname } = useAuthUser();

    // Fetch user data when logged in
    useEffect(() => {
        const fetchUserData = async () => {
            if (isLoggedIn) {
                try {
                    const response = await fetch('http://localhost:8080/users/me', {
                        method: 'GET',
                        credentials: 'include', // Include cookies with the request
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.username),
                        setFirstname(data.firstname),
                        setLastname(data.lastname);
                    } else {
                        console.error('Failed to fetch user data');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [isLoggedIn, setUsername, setFirstname, setLastname]);

    const handleLogout = async () => {
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken, refreshToken }),
            });

            if (response.ok) {
                console.log('Successfully logged out');
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                setIsLoggedIn(false);
                setUsername("");
                setFirstname("")
                setLastname("")
                router.push('/login');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <header className={`bg-gray-100 p-2 opacity-80 mb-1 ${className}`}>
            <div className="mx-auto flex flex-row items-center justify-between text-[12px] w-full max-w-custom">
                {isLoggedIn ? (
                    <div className="flex flex-row items-center space-x-2">
                        <Link href="/users/change_data" className="hover:text-blue-600">
                            {firstname} {lastname} / {username}
                        </Link>
                        <a href="#" onClick={handleLogout} className="hover:text-blue-600">Logi välja</a>
                    </div>
                ) : (
                    <a href="/login" className="hover:text-blue-600">Logi sisse</a>
                )}
            </div>
        </header>


    );
};

export default Header;
