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
    const [carImages, setCarImages] = useState<Record<string, string[]>>({});
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

                    // Fetch image URLs for each car
                    const imageFetchPromises = carDetails.map(car =>
                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/productImages/getCarImages/${car.id}`)
                            .then(res => res.ok ? res.json() : [])
                            .catch(() => [])
                    );

                    // Once all image fetches are completed, update carImages state
                    const imagesArray = await Promise.all(imageFetchPromises);
                    const imagesObject: Record<string, string[]> = {};

                    // Map each car's ID to its images
                    carDetails.forEach((car, index) => {
                        imagesObject[car.id] = imagesArray[index];
                    });

                    setCarImages(imagesObject);
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

    return { cars, carImages, loading, error };
};

export default useCarPreview;
