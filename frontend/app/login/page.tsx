"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthUser } from '@/app/context/AuthUserContext';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState(''); // New state for info message
    const { setIsLoggedIn, updateUserData } = useAuthUser();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get('confirmed') === 'true') {
            setSuccessMessage('E-post on edukalt kinnitatud! Palun logi sisse, et jätkata.');
        }
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                setError('');
                setIsLoggedIn(true);
                updateUserData();
                router.push('/users/minu/');
            } else {
                setError("Vigased sisselogimisandmed. Palun proovi uuesti.");
            }
        } catch (error) {
            console.error('Sisselogimine ebaõnnestus:', error);
            setError('Tekkis viga. Palun proovi uuesti.');
        }
    };

    const handleRegisterRedirect = () => {
        router.push('/register');
    };

    const handleAddListingClick = () => {
        if (!username || !password) {
            setInfoMessage("Logi esmalt sisse.");
            setTimeout(() => setInfoMessage(''), 3000); // Clear message after 3 seconds
        } else {
            // Navigate to the add listing page if logged in
            router.push('/add-listing'); // Adjust this path as needed
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-8 md:p-16 w-full max-w-4xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-8 md:mb-0">
                    <h2 className="text-2xl mb-6 text-center">Logi sisse</h2>
                    {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="username"
                                placeholder="Kasutajanimi"
                                className="w-full p-2 border border-gray-300"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                placeholder="Parool"
                                className="w-full p-2 border border-gray-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center mt-2 mb-2 text-[12px]">
                            <div className="flex items-center">
                                <input type="checkbox" />
                                <p className="ml-2">Mäleta mind</p>
                            </div>
                            <p
                                className="flex justify-end text-blue-500 cursor-pointer hover:underline"
                                onClick={() => router.push('/forgot_password')}
                            >
                                Unustasin parooli
                            </p>
                        </div>

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            SISENE
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 pl-0 md:pl-4 flex flex-col justify-center items-center">
                    <button
                        className="w-full bg-white border-[1px] border-black font-bold text-gray-500 p-2 mb-4 hover:border-blue-500 hover:text-blue-600 transition duration-300"
                        onClick={handleRegisterRedirect}
                    >
                        REGISTREERU
                    </button>
                    <button
                        className="w-full bg-lime-600 text-white p-2 hover:bg-lime-500 transition duration-300"
                        onClick={handleAddListingClick}
                    >
                        LISA KUULUTUS
                    </button>
                    {infoMessage && <p className="text-xl mt-10">{infoMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
