"use client";
import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password?email=${encodeURIComponent(email)}`,
                {
                    method: "POST",
                }
            );

            if (response.ok) {
                setMessage("Taastamislink saadetud e-posti aadressile.");
            } else {
                setMessage("Kasutajat ei leitud. Kontrollige e-posti aadressi.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Viga. Palun proovige hiljem uuesti.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 w-full max-w-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Unustasin parooli</h2>
                    <p className="text-gray-600">
                        Sisesta oma e-posti aadress ja saadame taastamislingi.
                    </p>
                </div>

                <form onSubmit={handlePasswordReset} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            E-posti aadress
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Sisesta e-posti aadress"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                            required
                        />
                    </div>
                    {isLoading && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-700 text-center text-sm">E-kirja saatmine...</p>
                        </div>
                    )}
                    {message && !isLoading && (
                        <div className={`border rounded-lg p-4 ${
                            message.includes("ei leitud") || message.includes("valesti") || message.includes("Viga")
                                ? "bg-red-50 border-red-200"
                                : "bg-green-50 border-green-200"
                        }`}>
                            <p className={`text-center text-sm ${
                                message.includes("ei leitud") || message.includes("valesti") || message.includes("Viga")
                                    ? "text-red-700"
                                    : "text-green-700"
                            }`}>
                                {message}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Saatmine..." : "SAADA LINK"}
                    </button>
                </form>
                <div className="mt-8 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-gray-500">või</span>
                        </div>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="mt-4 text-green-600 hover:text-green-800 hover:underline transition duration-200 text-sm font-medium"
                    >
                        Tagasi sisselogimise lehele
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;