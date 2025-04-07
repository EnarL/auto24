"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();  // You weren't using this properly

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
        <div className="flex justify-center items-start min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 shadow-sm border bg-white mt-10 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Unustasin parooli</h2>
                <p className="text-gray-600 text-center mb-6">
                    Sisesta oma e-posti aadress ja saadame taastamislingi.
                </p>

                <form onSubmit={handlePasswordReset}>
                    <div className="mb-6">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Sisesta e-mail *"
                            className="w-full p-4 text-[14px] border border-gray-300 focus:border-blue-600 focus:outline-none "
                            required
                        />
                    </div>
                    {isLoading ? (
                        <p className="text-center mt-4 text-gray-600">E-kirja saatmine...</p>
                    ) : (
                        message && (
                            <p
                                className={`text-center mt-4 ${
                                    message.includes("ei leitud") || message.includes("valesti") || message.includes("Viga")
                                        ? "text-red-600"
                                        : "text-green-600"
                                }`}
                            >
                                {message}
                            </p>
                        )
                    )}

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-1 hover:bg-blue-700 transition"
                        >
                            Saada link
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;