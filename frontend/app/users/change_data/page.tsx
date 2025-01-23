"use client"
import React, { useState } from 'react';
import Sidebar from "@/app/components/Sidebar";

const ChangePasswordPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [newsletter, setNewsletter] = useState(false);
    const [terms, setTerms] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    newsletter: newsletter,
                    terms: terms,
                }),
            });

            if (response.ok) {
                setSuccess('Successfully registered');
                setError('');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
                setSuccess('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="flex">
            <Sidebar activeSection="Muuda andmeid"/>
            <div className="">
                <h2 className="text-[24px] p-2">Kasutajaks registreerumine</h2>
                <p className="italic pl-2 text-[12px]">Tärniga (*) tähistatud väljad on kohustuslikud!</p>
                <form className="w-[500px] ml-[25%] mt-6 flex flex-col" onSubmit={handleRegister}>
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="email">Meiliaadress
                            *</label>
                        <input
                            type="text"
                            id="eesnimi"
                            className="border border-gray-300 w-[300px]"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2 flex items-center">
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="eesnimi">Eesnimi
                            *</label>
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
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="perekonnanimi">Perekonnanimi
                            *</label>
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
                        <label className="block text-gray-700 mx-auto w-[150px] text-[12px]" htmlFor="Telefon">
                            Telefon
                        </label>
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
                        <label className="block mx-auto text-gray-700 text-[12px]" htmlFor="newsletter">Soovin saada
                            auto24.ee uudiskirja e-postiga *</label>
                        <input
                            type="checkbox"
                            id="newsletter"
                            className=""
                            checked={newsletter}
                            onChange={(e) => setNewsletter(e.target.checked)}
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <label className="block mx-auto text-gray-700 text-[12px]" htmlFor="terms">Nõustun <a
                            href="https://www.auto24.ee/users/kasutustingimused.php"
                            className="underline hover:text-blue-600">andmekaitse-ja kasutusetingimustega</a> *</label>
                        <input
                            type="checkbox"
                            id="terms"
                            className=""
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
                        MUUDA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;