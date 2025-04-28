"use client";
import UserLayout from "@/app/components/user/UserLayout";
import useRequireAuth from "@/app/hooks/useRequireAuth";
import useUserCars from "@/app/hooks/useUserCars";
import useCarActions from "@/app/hooks/useCarActions";
import React from "react";
import NoListingsMessage from "@/app/components/user/NoListingsMessage";

const MinuPage: React.FC = () => {
    const { isLoggedIn } = useRequireAuth();
    const { userCars, setUserCars, loading } = useUserCars();
    const { handleToggleActive, handleDeleteCar, handleEditCar } = useCarActions(userCars, setUserCars);
    if (!isLoggedIn) return null;

    return (
        <UserLayout activeTab="Kõik">
            <div className="flex flex-col ">
                {loading ? (
                    <div className="text-center p-3  text-gray-500 text-lg">Loading cars...</div>
                ) : userCars.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6  md:ml-3">
                        {userCars.map((car) => (
                            <div
                                key={car.id}
                                className="border rounded-lg shadow-lg p-6 bg-gradient-to-b from-white to-gray-50 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-xl text-gray-800">{car.title || "Unknown Title"}</h3>
                                    <span
                                        onClick={() => handleToggleActive(car.id)}
                                        className={`cursor-pointer font-semibold px-3 py-1 rounded-full ${
                                            car.isActive
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                        }`}
                                    >
                                        {car.isActive ? "Aktiivne" : "Mitteaktiivne"}
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-2 text-sm">
                                    Kehtiv kuni:{" "}
                                    {car.expirationDate
                                        ? new Date(car.expirationDate).toLocaleDateString("et-EE")
                                        : "Unknown Date"}
                                </p>
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        onClick={() => handleEditCar(car.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        Muuda andmeid
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCar(car.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Kustuta kuulutus
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoListingsMessage />
                )}
            </div>
        </UserLayout>
    );
};

export default MinuPage;