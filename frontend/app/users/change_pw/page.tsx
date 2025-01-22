"use client"
import React, { useState } from 'react';
import Sidebar from "@/app/components/Sidebar";

const ChangePasswordPage: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Current Password:', currentPassword);
        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);
    };

    return (
        <div className="flex">
            <Sidebar activeSection="Muuda parool" />

            <form onSubmit={handleSubmit} className="ml-[10px] bg-white w-full max-w-md">
                <p className="text-[16px] pt-2 font-bold mb-4">Muuda parool</p>
                <div className="flex flex-col ">

                    <div
                        className="border-l-4 border-gray-300 w-[740px] p-4 bg-gray-50 text-[12px] flex items-center"
                    >
                        <img src="https://www.auto24.ee/images/icons/msg/help.svg" alt="Help" className="mr-2"/>
                        <div>
                            Parool peab sisaldama vähemalt ühte numbrit ning ühte tähte.
                            <p>Parool peab olema vähemalt 8 märki pikk</p>
                        </div>
                    </div>

                </div>


                <div className="p-2 mt-2 w-[370px] ">
                    <input
                        type="password"
                        value={currentPassword}
                        placeholder="Praegune parool *"
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-1.5 text-[14px] border border-gray-300 focus:border-blue-600 focus:outline-none cursor-pointer"
                        required
                    />
                </div>
                <div className=" p-2 w-[370px]">
                    <input
                        type="password"
                        value={newPassword}
                        placeholder="Uus parool *"
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-1.5 text-[14px] border border-gray-300 focus:border-blue-600 focus:outline-none cursor-pointer"
                        required
                    />
                </div>
                <div className=" p-2 w-[370px]">
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Kinnita parool *"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-1.5 text-[14px] border border-gray-300 focus:border-blue-600 focus:outline-none cursor-pointer"
                        required
                    />
                </div>
                <div className="w-[370px]">
                    <button type="submit"
                            className="bg-[#06c] text-white text-center w-[100px] p-1 justify-center mx-auto flex ">
                        Muuda
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ChangePasswordPage;