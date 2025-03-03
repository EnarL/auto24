import { useEffect, useState } from "react";
import {CarDetailsDTO, CarExtraInfoDTO} from "@/app/types/types";



const useCarDetails = (id: string | Array<string> | undefined) => {
    const [car, setCar] = useState<CarDetailsDTO | null>(null);
    const [carExtraInfo, setCarExtraInfo] = useState<CarExtraInfoDTO | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;

        const fetchCarDetails = async () => {
            try {
                const carResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars/carlisting/${id}`);
                if (carResponse.ok) {
                    const carData = await carResponse.json();
                    setCar(carData.carDetailsDTO);
                    setCarExtraInfo(carData.carExtraInfoDTO);
                }

                const imageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/productImages/getCarImages/${id}`);
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
    }, [id]);

    return { car, carExtraInfo, images, isLoading };
};

export default useCarDetails;
