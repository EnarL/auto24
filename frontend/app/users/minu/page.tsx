"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import { useAuthUser } from '@/app/context/AuthUserContext';  // Importing the context
import Link from 'next/link';

// Define types for the car preview data
interface CarPreview {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageKeys: string[];
}

const MinuPage: React.FC = () => {
    const { isLoggedIn, username } = useAuthUser();  // Get the logged-in user details from context
    const [userCars, setUserCars] = useState<CarPreview[]>([]);  // Store user's car previews
    const [loading, setLoading] = useState<boolean>(true);  // Loading state
    const [carImages, setCarImages] = useState<Record<string, string[]>>({});  // Store images for each car

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

    return (
        <div className="flex flex-col">
            <div className="flex">
                <Sidebar activeSection="Kõik" />
                <div className="flex flex-col">
                    <Tabs activeTab="Kõik" />
                    {loading ? (
                        <div className="text-center p-3">Loading cars...</div>
                    ) : userCars.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mx-5">
                            {userCars.map((car, index) => (
                                <div key={index} className="border rounded-md overflow-hidden shadow-md">
                                    <Link href={`/cars/${car.id}`} passHref>
                                        <div className="cursor-pointer">
                                            <img
                                                src={carImages[car.id]?.[0] || 'fallback-image-url'}
                                                alt={car.title}
                                                className="w-full h-40 object-cover"
                                            />
                                            <div className="p-3">
                                                <h3 className="font-bold text-lg">{car.title}</h3>
                                                <p className="text-gray-600">{car.firstRegistrationDate}</p>
                                                <p className="text-blue-600">{car.price} EUR</p>
                                            </div>
                                        </div>
                                    </Link>
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
