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
            <div className="w-[400px] ml-4  mt-6 flex flex-col">
                <h2 className="text-[24px] font-semibold">Muuda parool</h2>
                <p className="italic mt-2 mb-2 text-[12px] text-gray-600">
                    Tärniga (*) tähistatud väljad on kohustuslikud!
                </p>

                <div className="border-l-4 border-gray-300 w-full p-3 bg-gray-50 text-[12px] text-gray-700">
                    <p>Parool peab sisaldama vähemalt ühte numbrit ja ühte tähte.</p>
                    <p>Parool peab olema vähemalt 8 märki pikk.</p>
                </div>

                {success && <p className="mt-3 p-2 bg-green-100 text-green-700 text-sm border border-green-400 rounded">{success}</p>}
                {error && <p className="mt-3 p-2 bg-red-100 text-red-700 text-sm border border-red-400 rounded">{error}</p>}

                <form onSubmit={handlePasswordChange} className="mt-4">
                    <div className="mt-3">
                        <input
                            type="password"
                            value={currentPassword}
                            placeholder="Praegune parool *"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full p-2 text-[14px] border border-gray-300 focus:border-blue-600 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <input
                            type="password"
                            value={newPassword}
                            placeholder="Uus parool *"
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 text-[14px] border border-gray-300 focus:border-blue-600 focus:outline-none rounded"
                            required
                        />
                    </div>
                    <div className="mt-3">
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Kinnita uus parool *"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 text-[14px] border border-gray-300 focus:border-blue-600 focus:outline-none rounded"
                            required
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 w-[200px] p-1"
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
