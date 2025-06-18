"use client";

import React, { useState } from "react";

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (username.length < 3) {
            setError("Kasutajanimi peab olema vähemalt 3 tähemärki.");
            return;
        }

        if (password.length < 8) {
            setError("Parool peab olema vähemalt 8 tähemärki.");
            return;
        }

        if (password !== confirmationPassword) {
            setError("Paroolid ei ühti.");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    firstname,
                    lastname,
                    password,
                    confirmationPassword,
                    email,
                    newsletter,
                    terms,
                }),
            });

            if (response.ok) {
                setSuccess("Registreerumine õnnestus! Kontrolli oma e-posti aadressi kinnitamiseks.");
                setError("");
            } else {
                const errorData = await response.json();
                if (errorData.status === 409) {
                    if (errorData.message.includes("Username")) {
                        setError("Kasutajanimi on juba kasutuses.");
                    } else if (errorData.message.includes("Email")) {
                        setError("Meiliaadress on juba kasutuses.");
                    } else {
                        setError("Kasutaja antud andmetega on juba olemas.");
                    }
                } else {
                    setError(errorData.error || "Registreerumine ebaõnnestus. Palun proovi uuesti.");
                }
                setSuccess("");
            }
        } catch (error) {
            console.error("Viga:", error);
            setError("Tekkis ootamatu viga. Palun proovi hiljem uuesti.");
            setSuccess("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-12 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-black mb-4 text-center">Kasutajaks registreerumine</h2>
                <p className="italic text-sm text-gray-600 text-center mb-6">Tärniga (*) tähistatud väljad on kohustuslikud!</p>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1" htmlFor="email">Meiliaadress *</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1" htmlFor="username">Kasutaja *</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1" htmlFor="password">Parool *</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1" htmlFor="passwordConfirm">Parool uuesti *</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={confirmationPassword}
                            onChange={(e) => setConfirmationPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1" htmlFor="firstname">Eesnimi *</label>
                        <input
                            type="text"
                            id="firstname"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm mb-1" htmlFor="lastname">Perekonnanimi *</label>
                        <input
                            type="text"
                            id="lastname"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="newsletter"
                            className="mr-2"
                            checked={newsletter}
                            onChange={(e) => setNewsletter(e.target.checked)}
                        />
                        <label htmlFor="newsletter" className="text-sm text-gray-700">Soovin saada auto24.ee uudiskirja e-postiga</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mr-2"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                            Nõustun <a className="text-blue-500 underline hover:text-blue-600">andmekaitse- ja kasutusetingimustega</a> *
                        </label>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        REGISTREERU
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;