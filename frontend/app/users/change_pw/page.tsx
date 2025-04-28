"use client";

import React, { useState } from "react";
import UserLayout from "@/app/components/user/UserLayout";
import useChangePassword from "@/app/hooks/useChangePassword";

const ChangePasswordPage: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { changePassword, error, success } = useChangePassword();

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        await changePassword(currentPassword, newPassword, confirmPassword);

        if (!error) {
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <UserLayout activeTab="Muuda parool">
            <div className="ml-[10px] w-[740px] mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Muuda parool</h2>
                <p className="italic text-sm text-gray-500 mb-6">
                    Tärniga (*) tähistatud väljad on kohustuslikud!
                </p>

                <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg text-sm text-blue-700 mb-6">
                    <p>Parool peab olema vähemalt 8 märki pikk.</p>
                </div>

                {success && (
                    <p className="mb-4 p-3 bg-green-100 text-green-700 text-sm border border-green-400 rounded-lg">
                        {success}
                    </p>
                )}
                {error && (
                    <p className="mb-4 p-3 bg-red-100 text-red-700 text-sm border border-red-400 rounded-lg">
                        {error}
                    </p>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={currentPassword}
                            placeholder="Praegune parool *"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={newPassword}
                            placeholder="Uus parool *"
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Kinnita uus parool *"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                        >
                            MUUDA PAROOL
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
};

export default ChangePasswordPage;