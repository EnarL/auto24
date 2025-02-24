"use client"

import React, { useState } from 'react';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    email: email,
                    newsletter: newsletter,
                    terms: terms,
                }),
            });

            if (response.ok) {
                setSuccess('Registreerumine õnnestus! Kontrolli oma e-posti aadressi kinnitamiseks.');
                setError('');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || 'Registreerumine ebaõnnestus. Palun proovi uuesti.');
                setSuccess('');
            }
        } catch (error) {
            console.error('Viga:', error);
            setError('Tekkis ootamatu viga. Palun proovi hiljem uuesti.');
            setSuccess('');
        }
    };

    return (
        <div className="">
            <div className="">
                <h2 className="text-[24px] p-2">Kasutajaks registreerumine</h2>
                <p className="italic pl-2 text-[12px]">Tärniga (*) tähistatud väljad on kohustuslikud!</p>
                <form className="w-[500px] ml-[25%] mt-6 flex flex-col" onSubmit={handleRegister}>
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="email">Meiliaadress *</label>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 w-[300px]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="username">Kasutaja *</label>
                        <input
                            type="text"
                            id="username"
                            className="border border-gray-300 w-[300px]"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="password">Parool</label>
                        <input
                            type="password"
                            id="password"
                            className="border border-gray-300 w-[300px]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="password">Parool uuesti *</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            className="border border-gray-300 w-[300px]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="eesnimi">Eesnimi *</label>
                        <input
                            type="text"
                            id="eesnimi"
                            className="border border-gray-300 w-[300px]"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="perekonnanimi">Perekonnanimi *</label>
                        <input
                            type="text"
                            id="perekonnanimi"
                            className="border border-gray-300 w-[300px]"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block mx-auto text-gray-700 text-[12px]" htmlFor="newsletter">Soovin saada auto24.ee uudiskirja e-postiga *</label>
                        <input
                            type="checkbox"
                            id="newsletter"
                            checked={newsletter}
                            onChange={(e) => setNewsletter(e.target.checked)}
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block mx-auto text-gray-700 text-[12px]" htmlFor="terms">Nõustun <a href="https://www.auto24.ee/users/kasutustingimused.php" className="underline hover:text-blue-600">andmekaitse- ja kasutusetingimustega</a> *</label>
                        <input
                            type="checkbox"
                            id="terms"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}
                    <button
                        type="submit"
                        className="w-[250px] mt-4 bg-blue-500 text-white hover:bg-blue-600 transition duration-300 pl-10 pr-10 text-[14px] p-1 justify-center items-center mx-auto"
                    >
                        REGISTREERU
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
