"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import useCarActions from "@/app/hooks/useCarActions";
import useRequireAuth from "@/app/hooks/useRequireAuth";
import useUserCars from "@/app/hooks/useUserCars";

const ConfirmListing: React.FC = () => {
    const { isLoggedIn } = useRequireAuth();
    const { userCars, setUserCars, loading } = useUserCars();
    const { id } = useParams(); // Get the car ID from the URL
    const router = useRouter();
    const { handleToggleActive } = useCarActions(userCars, setUserCars);

    // Filter the car that matches the URL ID
    const selectedCar = userCars.find((car) => car.id === id);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-6">Kinnita oma kuulutus</h1>
            <div>
                <div className="mt-4">
                    {loading ? (
                        <p className="text-gray-600">Laadimine...</p>
                    ) : !selectedCar ? (
                        <p className="text-gray-600">Kuulutust ei leitud.</p>
                    ) : (
                        <div className="border border-gray-300 p-8 flex justify-between items-start rounded-lg shadow-lg w-[600px]">
                            <div>
                                <h4 className="font-medium text-lg mb-2">{selectedCar.title}</h4>
                                <p className="text-sm text-gray-600">
                                    Kehtiv kuni: {selectedCar.expirationDate ? new Date(selectedCar.expirationDate).toLocaleDateString("et-EE") : "Unknown Date"}
                                </p>
                                <p className={`text-sm font-semibold ${selectedCar.isActive ? "text-green-500" : "text-red-500"}`}>
                                    {selectedCar.isActive ? "Aktiivne" : "Mitteaktiivne"}
                                </p>
                            </div>
                            <div className="ml-6 flex flex-col space-y-3">
                                <Link
                                    href={`/users/edit/${selectedCar.id}`}
                                    className="bg-gray-300 text-black px-5 py-2 rounded hover:bg-gray-400 transition duration-200 text-center"
                                >
                                    Muuda kuulutust
                                </Link>
                                <button
                                    onClick={() => handleToggleActive(selectedCar.id)}
                                    className={`px-5 py-2 rounded transition duration-200 ${
                                        selectedCar.isActive
                                            ? "bg-red-500 text-white hover:bg-red-600"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    }`}
                                >
                                    {selectedCar.isActive ? "Deaktiveeri kuulutus" : "Kinnita kuulutus"}
                                </button>
                                <button
                                    onClick={() => router.push("/users/minu")}
                                    className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 transition duration-200"
                                >
                                    Jätka ilma kinnitamata
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmListing;
