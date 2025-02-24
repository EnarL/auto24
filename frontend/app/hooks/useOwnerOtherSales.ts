import { useState, useEffect } from "react";

interface CarPreviewDTO {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageKeys?: string[];
}

const useOwnerOtherSales = (carId: string) => {
    const [cars, setCars] = useState<CarPreviewDTO[]>([]);
    const [carImages, setCarImages] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!carId) return;

        const fetchOwnerOtherSales = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:8080/cars/OwnerOtherSales/${carId}`);
                if (!response.ok) throw new Error("Failed to fetch owner sales");

                const carPreviews: CarPreviewDTO[] = await response.json();
                setCars(carPreviews);
                const imagesMap: Record<string, string[]> = {};
                await Promise.all(
                    carPreviews.map(async (car) => {
                        if (car.id) {
                            const imageResponse = await fetch(`http://localhost:8080/productImages/getCarImages/${car.id}`);
                            if (imageResponse.ok) {
                                imagesMap[car.id] = await imageResponse.json();
                            }
                        }
                    })
                );

                setCarImages(imagesMap);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchOwnerOtherSales();
    }, [carId]);

    return { cars, carImages, loading, error };
};

export default useOwnerOtherSales;
