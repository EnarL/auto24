"use client"

import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 md:p-16 rounded shadow-md w-full max-w-4xl flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-8 md:mb-0">
                    <h2 className="text-2xl mb-6 text-center">Logi sisse</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            SISENE
                        </button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 pl-0 md:pl-4 flex flex-col justify-center items-center">
                    <button className="w-full bg-white border-2 border-gray-500 font-bold text-gray-500 p-2 rounded mb-4 hover:border-blue-500 hover:text-blue-600 transition duration-300">
                        REGISTREERU
                    </button>
                    <button className="w-full bg-lime-600 text-white p-2 rounded hover:bg-lime-500 transition duration-300">
                        LISA KUULUTUS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;