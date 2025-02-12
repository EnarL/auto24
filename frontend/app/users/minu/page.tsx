"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import { useAuthUser } from '@/app/context/AuthUserContext'; // Importing the context
import Link from 'next/link';

// Define types for the car preview data
interface CarPreview {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageKeys: string[];
    isActive: boolean; // Add property to track car listing status
}

const MinuPage: React.FC = () => {
    const { isLoggedIn, username } = useAuthUser(); // Get the logged-in user details from context
    const [userCars, setUserCars] = useState<CarPreview[]>([]); // Store user's car previews
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [carImages, setCarImages] = useState<Record<string, string[]>>({}); // Store images for each car

    // Function to fetch car images for each car
    const fetchCarImages = async (slug: string) => {
        try {
            const imageResponse = await fetch(`http://localhost:8080/productImages/getCarImages/${slug}`);
            if (imageResponse.ok) {
                const imageData: string[] = await imageResponse.json();
                return imageData;
            }
            return [];
        } catch (error) {
            console.error('Error fetching images for car:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchUserCars = async () => {
            if (isLoggedIn && username) {
                try {
                    const response = await fetch('http://localhost:8080/car-details/user/preview', {
                        method: 'GET',
                        credentials: 'include',
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserCars(data);

                        // Fetch images for each car
                        const imagePromises = data.map(async (car: any) => {
                            const imageUrls = await fetchCarImages(car.id);
                            return { carId: car.id, imageUrls };
                        });

                        const images = await Promise.all(imagePromises);
                        const carImagesMap: Record<string, string[]> = {};
                        images.forEach(({ carId, imageUrls }) => {
                            carImagesMap[carId] = imageUrls;
                        });
                        setCarImages(carImagesMap);
                    } else {
                        console.error('Failed to fetch car previews');
                    }
                } catch (error) {
                    console.error('Error fetching user car previews:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserCars();
    }, [isLoggedIn, username]);

    const handleDeleteCar = async (carId: string) => {
        if (window.confirm('Are you sure you want to delete this car sale?')) {
            try {
                const response = await fetch(`http://localhost:8080/car-details/delete/${carId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                if (response.ok) {
                    setUserCars(userCars.filter((car) => car.id !== carId));
                    alert('Car sale deleted successfully');
                } else {
                    alert('Failed to delete the car sale');
                }
            } catch (error) {
                console.error('Error deleting car:', error);
                alert('Error deleting car sale');
            }
        }
    };

    const handleEditCar = (carId: string) => {
        window.location.href = `/edit-car/${carId}`;
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
                            {userCars.map((car, index) => (
                                <div key={index} className="border rounded-md overflow-hidden shadow-md grid grid-cols-1 gap-4">
                                    {/* Car Image and Title Section */}
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-1">
                                            <img
                                                src={carImages[car.id]?.[0] || 'fallback-image-url'}
                                                alt={car.title}
                                                className="w-full h-32 object-cover"
                                            />
                                        </div>


                                        <div className="col-span-3 flex flex-col justify-between relative">
                                            {/* Status at the top-right */}
                                            <div className="absolute top-3 right-3 text-sm font-bold">
        <span className={car.isActive ? 'text-green-500' : 'text-red-500'}>
            {car.isActive ? 'Aktiivne' : 'Mitteaktiivne'}
        </span>
                                            </div>

                                            {/* Title and button */}
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-lg">{car.title}</h3>

                                                {/* Wrap button with Link for navigation */}
                                                <Link href={`/cars/${car.id}`} passHref>
                                                    <button className="text-blue-500 hover:text-blue-700 mt-2 self-start">
                                                        Vaata kuulutust
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>



                                    </div>

                                    <div className="grid grid-cols-1 gap-2 bg-gray-100 p-4">
                                        <div className="flex space-x-2 ">
                                            <button
                                                onClick={() => handleEditCar(car.id)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Muuda andmeid
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCar(car.id)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Lisa pilte
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCar(car.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Kustuta kuulutus
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="border-l-4 border-[#91d5ff] mt-4 ml-[10px] w-[740px] text-[#06c] mx-auto p-3 bg-[#f2faff] text-[14px] flex items-center">
                        <img src="https://www.auto24.ee/images/icons/msg/info.svg" alt="Info" className="mr-2" />
                            <span>Teil ei ole praegu sisestatud ühtegi kuulutust. </span>
                            <a href="#" className="underline ml-1">Sisesta kuulutus</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MinuPage;
