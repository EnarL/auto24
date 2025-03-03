"use client"
import { useState, useEffect } from 'react';

interface CarPreviewDTO {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageKeys?: string[];
    active: boolean;
}

const useCarPreviewForUser = () => {
    const [cars, setCars] = useState<CarPreviewDTO[]>([]);
    const [carImages, setCarImages] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:8080/car-details/user/preview', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const carDetails: CarPreviewDTO[] = await response.json();
                    setCars(carDetails);
                    for (const car of carDetails) {
                        if (car.id) {
                            const imageResponse = await fetch(`http://localhost:8080/productImages/getCarImages/${car.id}`, {
                                method: 'GET',
                                credentials: 'include',
                            });
                            if (imageResponse.ok) {
                                const imageUrls: string[] = await imageResponse.json();
                                setCarImages((prevImages) => ({
                                    ...prevImages,
                                    [car.id]: imageUrls,
                                }));
                            } else {
                                console.error(`Failed to fetch images for car ${car.id}`);
                            }
                        }
                    }
                } else {
                    setError('Failed to fetch car details');
                }
            
            } catch  {
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchCarDetails();
    }, []);

    return { cars, carImages, loading, error };
};

export default useCarPreviewForUser;
