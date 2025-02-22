"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Tabs from "../../components/Tabs";
import { useAuthUser } from "@/app/context/AuthUserContext";
interface CarPreview {
    id: string;
    title: string;
    expirationDate: string;
    isActive: boolean;
}

const MinuPage: React.FC = () => {
    const { isLoggedIn, username } = useAuthUser();
    const [userCars, setUserCars] = useState<CarPreview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserCars = async () => {
            if (isLoggedIn && username) {
                try {
                    const response = await fetch("http://localhost:8080/car-details/users", {
                        method: "GET",
                        credentials: "include",
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserCars(data);
                    } else {
                        console.error("Failed to fetch car previews");
                    }
                } catch (error) {
                    console.error("Error fetching user car previews:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserCars();
    }, [isLoggedIn, username]);

    const handleDeleteCar = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this car sale?")) {
            try {
                const response = await fetch(`http://localhost:8080/cars/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });

                if (response.ok) {
                    setUserCars(userCars.filter((car) => car.id !== id));
                    alert("Car sale deleted successfully");
                } else {
                    alert("Failed to delete the car sale");
                }
            } catch (error) {
                console.error("Error deleting car:", error);
                alert("Error deleting car sale");
            }
        }
    };

    const handleEditCar = (carId: string) => {
        window.location.href = `/edit/${carId}`;
    };

    return (
        <div className="flex flex-col">
            <div className="flex">
                <Sidebar activeSection="Kõik" />
                <div className="flex flex-col w-full">
                    <Tabs activeTab="Kõik" />
                    {loading ? (
                        <div className="text-center p-3">Loading cars...</div>
                    ) : userCars.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 mt-4 mx-5">
                            {userCars.map((car) => (
                                <div key={car.id} className="border rounded-md shadow-md p-4 bg-white">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-lg">{car.title}</h3>
                                        <span
                                            className={car.isActive ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                      {car.isActive ? "Aktiivne" : "Mitteaktiivne"}
                    </span>
                                    </div>
                                    <p className="text-gray-600 mt-1">
                                        Kehtiv kuni: {new Date(car.expirationDate).toLocaleDateString("et-EE")}
                                    </p>
                                    <div className="flex space-x-4 mt-3">
                                        <button onClick={() => handleEditCar(car.id)}
                                                className="text-blue-500 hover:text-blue-700">
                                            Muuda andmeid
                                        </button>
                                        <button onClick={() => handleDeleteCar(car.id)}
                                                className="text-red-500 hover:text-red-700">
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
            </div>
        </div>
    );
};

export default MinuPage;
