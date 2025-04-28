"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthUser } from '@/app/context/AuthUserContext';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
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
                router.push('/users/my');
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
            setTimeout(() => setInfoMessage(''), 3000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-16 w-full max-w-4xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Logi sisse</h2>
                    {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input
                                type="text"
                                id="username"
                                placeholder="Kasutajanimi"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center mt-2 mb-4 text-sm">
                            <div className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                <p className="text-gray-600">Mäleta mind</p>
                            </div>
                            <p
                                className="text-blue-500 cursor-pointer hover:underline"
                                onClick={() => router.push('/forgot_password')}
                            >
                                Unustasin parooli
                            </p>
                        </div>

                        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            SISENE
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 pl-0 md:pl-8 flex flex-col justify-center items-center">
                    <button
                        className="w-full bg-white border border-blue-500 text-blue-500 font-bold p-3 mb-4 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                        onClick={handleRegisterRedirect}
                    >
                        REGISTREERU
                    </button>
                    <button
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition duration-300"
                        onClick={handleAddListingClick}
                    >
                        LISA KUULUTUS
                    </button>
                    {infoMessage && <p className="text-blue-600 mt-6 text-center">{infoMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;