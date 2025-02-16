"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
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
        <div className="flex">
            <Sidebar activeSection="Muuda parool" />

            <form onSubmit={handlePasswordChange} className="ml-[10px] bg-white w-full max-w-md p-4 shadow-sm border">
                <p className="text-[16px] font-bold mb-4">Muuda parool</p>

                {/* Parooli nõuded */}
                <div className="border-l-4 border-gray-300 w-full p-3 bg-gray-50 text-[12px]">
                    <p>Parool peab sisaldama vähemalt ühte numbrit ja ühte tähte.</p>
                    <p>Parool peab olema vähemalt 8 märki pikk.</p>
                </div>

                {/* Teavitused */}
                {success && <p className="mt-3 p-2 bg-green-100 text-green-700 text-sm border border-green-400 rounded">{success}</p>}
                {error && <p className="mt-3 p-2 bg-red-100 text-red-700 text-sm border border-red-400 rounded">{error}</p>}

                {/* Sisestusväljad */}
                <div className="mt-3">
                    <input
                        type="password"
                        value={currentPassword}
                        placeholder="Praegune parool *"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2 text-[14px] border border-gray-300 focus:border-blue-600 focus:outline-none rounded"
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

                {/* Nupp */}
                <div className="mt-4">
                    <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition">
                        Muuda parool
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
