"use client";
import React, { useState } from "react";
import UserLayout from "@/app/components/user/UserLayout";
import useRequireAuth from "@/app/hooks/useRequireAuth";
import useUserCars from "@/app/hooks/useUserCars";
import useCarActions from "@/app/hooks/useCarActions";

const MinuPage: React.FC = () => {
    const { isLoggedIn } = useRequireAuth();
    const { userCars, setUserCars, loading } = useUserCars();
    const { handleToggleActive, handleDeleteCar, handleEditCar } = useCarActions(userCars, setUserCars);
    const [isMenuVisible, setIsMenuVisible] = useState(false); // State to control MenuBar visibility

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    if (!isLoggedIn) return null;

    return (
        <UserLayout activeTab="Kõik">
            <div className="flex flex-col">
                {loading ? (
                    <div className="text-center p-3">Loading cars...</div>
                ) : userCars.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 mt-4 ml-3">
                        {userCars.map((car) => (
                            <div key={car.id} className="border rounded-md shadow-md p-4 bg-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-lg">{car.title || "Unknown Title"}</h3>
                                    <span
                                        onClick={() => handleToggleActive(car.id)}
                                        className={`cursor-pointer font-semibold ${car.isActive ? "text-green-500" : "text-red-500"}`}
                                    >
                                        {car.isActive ? "Aktiivne" : "Mitteaktiivne"}
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-1">
                                    Kehtiv kuni: {car.expirationDate ? new Date(car.expirationDate).toLocaleDateString("et-EE") : "Unknown Date"}
                                </p>
                                <div className="flex space-x-4 mt-3">
                                    <button onClick={() => handleEditCar(car.id)} className="text-blue-500 hover:text-blue-700">
                                        Muuda andmeid
                                    </button>
                                    <button onClick={() => handleDeleteCar(car.id)} className="text-red-500 hover:text-red-700">
                                        Kustuta kuulutus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="border-l-4 border-[#91d5ff] mt-4 ml-[10px] w-[740px] text-[#06c] mx-auto p-3 bg-[#f2faff] text-[14px] flex items-center">
                        <img src="https://www.auto24.ee/images/icons/msg/info.svg" alt="Info" className="mr-2" />
                        <span>Teil ei ole praegu sisestatud ühtegi kuulutust.</span>
                        <a href="#" className="underline ml-1">Sisesta kuulutus</a>
                    </div>
                )}
            </div>
        </UserLayout>
    );
};

export default MinuPage;
