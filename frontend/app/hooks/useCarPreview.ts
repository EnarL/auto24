import { useState, useEffect } from 'react';

interface CarPreviewDTO {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageKeys?: string[];
}
const useCarPreview = () => {
    const [cars, setCars] = useState<CarPreviewDTO[]>([]);
    const [carImages, setCarImages] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCarDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:8080/car-details/preview');
                if (response.ok) {
                    const carDetails: CarPreviewDTO[] = await response.json();
                    setCars(carDetails);
                    for (const car of carDetails) {
                        if (car.id) {
                            const imageResponse = await fetch(`http://localhost:8080/productImages/getCarImages/${car.id}`);
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
            } catch (error) {
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchCarDetails();
    }, []);

    return { cars, carImages, loading, error };
};

export default useCarPreview;
