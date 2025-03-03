"use client";

import React, { useState } from "react";

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [newsletter, setNewsletter] = useState(false);
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
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
                    email,
                    newsletter,
                    terms,
                }),
            });

            if (response.ok) {
                setSuccess("Registreerumine õnnestus! Kontrolli oma e-posti aadressi kinnitamiseks.");
                setError("");
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || "Registreerumine ebaõnnestus. Palun proovi uuesti.");
                setSuccess("");
            }
        } catch (error) {
            console.error("Viga:", error);
            setError("Tekkis ootamatu viga. Palun proovi hiljem uuesti.");
            setSuccess("");
        }
    };

    return (
        <div className="flex flex-col items-center px-4 sm:px-0">
            <div className="w-full max-w-[500px]">
                <h2 className="text-[24px] p-2 text-center">Kasutajaks registreerumine</h2>
                <p className="italic text-[12px] text-center">Tärniga (*) tähistatud väljad on kohustuslikud!</p>
                <form className="w-full flex flex-col mt-6" onSubmit={handleRegister}>
                    <div className="mb-2 flex flex-col sm:flex-row items-center">
                        <label className="block text-gray-700 w-full sm:w-[150px] text-[12px] text-center sm:text-left"
                               htmlFor="email">
                            Meiliaadress *
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 w-full sm:w-[300px] p-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex flex-col sm:flex-row items-center">
                        <label className="block text-gray-700 w-full sm:w-[150px] text-[12px] text-center sm:text-left"
                               htmlFor="username">
                            Kasutaja *
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="border border-gray-300 w-full sm:w-[300px] p-1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex flex-col sm:flex-row items-center">
                        <label className="block text-gray-700 w-full sm:w-[150px] text-[12px] text-center sm:text-left"
                               htmlFor="password">
                            Parool
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border border-gray-300 w-full sm:w-[300px] p-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex flex-col sm:flex-row items-center">
                        <label className="block text-gray-700 w-full sm:w-[150px] text-[12px] text-center sm:text-left"
                               htmlFor="passwordConfirm">
                            Parool uuesti *
                        </label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            className="border border-gray-300 w-full sm:w-[300px] p-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex flex-col sm:flex-row items-center">
                        <label className="block text-gray-700 w-full sm:w-[150px] text-[12px] text-center sm:text-left"
                               htmlFor="firstname">
                            Eesnimi *
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            className="border border-gray-300 w-full sm:w-[300px] p-1"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row items-center">
                        <label className="block text-gray-700 w-full sm:w-[150px] text-[12px] text-center sm:text-left"
                               htmlFor="lastname">
                            Perekonnanimi *
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            className="border border-gray-300 w-full sm:w-[300px] p-1"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between  md:w-[90%]">
                        <label className="block text-gray-700 text-[12px]" htmlFor="newsletter">
                            Soovin saada auto24.ee uudiskirja e-postiga
                        </label>
                        <input
                            type="checkbox"
                            id="newsletter"
                            checked={newsletter}
                            onChange={(e) => setNewsletter(e.target.checked)}

                        />
                    </div>
                    <div className="mb-4 flex items-center justify-between  md:w-[90%]">
                        <label className="block text-gray-700 text-[12px]" htmlFor="terms">
                            Nõustun{" "}
                            <a href="https://www.auto24.ee/users/kasutustingimused.php"
                               className="underline hover:text-blue-600">
                                andmekaitse- ja kasutusetingimustega
                            </a>{" "}
                            *
                        </label>
                        <input
                            type="checkbox"
                            id="terms"
                            className="ml-[-10px]" // Adjust the checkbox position
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                        />
                    </div>


                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                    <button
                        type="submit"
                        className="w-[250px] mt-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 p-2 text-[14px] mx-auto block"
                    >
                        REGISTREERU
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
