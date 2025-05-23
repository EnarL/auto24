import { useState, useEffect } from 'react';

interface CarPreviewDTO {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageUrls: string[]; // This holds the URLs for images
}

const useCarPreview = () => {
    const [cars, setCars] = useState<CarPreviewDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/car-details/preview`);
                if (response.ok) {
                    const carDetails: CarPreviewDTO[] = await response.json();
                    setCars(carDetails);
                } else {
                    setError('Failed to fetch car details');
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Error:', error.message);
                } else {
                    console.error('Unknown error occurred');
                }
                setError('An error occurred while fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, []);

    return { cars, loading, error };
};

export default useCarPreview;