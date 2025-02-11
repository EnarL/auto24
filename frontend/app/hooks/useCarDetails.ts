import { useEffect, useState } from "react";
import {CarDetailsDTO, CarExtraInfoDTO} from "@/app/types/types";



const useCarDetails = (slug: string) => {
    const [car, setCar] = useState<CarDetailsDTO | null>(null);
    const [carExtraInfo, setCarExtraInfo] = useState<CarExtraInfoDTO | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!slug) return;

        const fetchCarDetails = async () => {
            try {
                const carResponse = await fetch(`http://localhost:8080/cars/carlisting/${slug}`);
                if (carResponse.ok) {
                    const carData = await carResponse.json();
                    setCar(carData.carDetailsDTO);
                    setCarExtraInfo(carData.carExtraInfoDTO);
                }

                const imageResponse = await fetch(`http://localhost:8080/productImages/getCarImages/${slug}`);
                if (imageResponse.ok) {
                    const imageData: string[] = await imageResponse.json();
                    setImages(imageData);
                }
            } catch (error) {
                console.error("Error fetching car details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCarDetails();
    }, [slug]);

    return { car, carExtraInfo, images, isLoading };
};

export default useCarDetails;
