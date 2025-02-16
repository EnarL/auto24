"use client"
import React, { useState } from "react";
import useVerifyToken from "../hooks/useVerifyToken";
import useResetPassword from "../hooks/useResetPassword";
import {useSearchParams} from "next/navigation";

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const { validToken, error: tokenError } = useVerifyToken(token);
    const { message, error, handleResetPassword } = useResetPassword(token);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        handleResetPassword(newPassword, confirmPassword);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
                <h2 className="text-2xl mb-4 text-center">Muuda parool</h2>
                {tokenError && <p className="text-red-600 text-center">{tokenError}</p>}
                {!validToken ? (
                    <p className="text-gray-600 text-center">Kontrollin linki...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Uus parool"
                            className="w-full p-2 border border-gray-300 mb-4"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Kinnita uus parool"
                            className="w-full p-2 border border-gray-300 mb-4"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Muuda parool
                        </button>
                    </form>
                )}
                {message && <p className="text-center mt-4 text-green-600">{message}</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
