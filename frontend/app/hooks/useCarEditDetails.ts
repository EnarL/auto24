import { useState, useEffect } from "react";
import axios from "axios";
import { CarDetailsDTO, CarExtraInfoDTO } from "@/app/types/types";
import carExtraInfoFormData from "@/app/utils/CarExtraInfoFormData";
import carDetailsFormData from "@/app/utils/CarDetailsFormData";

interface CarListingResponse {
    carDetailsDTO: CarDetailsDTO;
    carExtraInfoDTO: CarExtraInfoDTO;
}

export const useCarEditDetails = (id?: string | string[]) => {
    const [carDetails, setCarDetails] = useState<CarDetailsDTO>(carDetailsFormData);
    const [carExtraInfo, setCarExtraInfo] = useState<CarExtraInfoDTO>(carExtraInfoFormData);
    const [isLoading, setIsLoading] = useState<boolean>(!!id);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const carId = id ? (Array.isArray(id) ? id[0] : id) : undefined;

    useEffect(() => {
        if (!carId) return;

        const fetchCarListing = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<CarListingResponse>(
                    `http://localhost:8080/cars/carlisting/${carId}`,
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    const { carDetailsDTO, carExtraInfoDTO } = response.data;
                    setCarDetails(prev => ({ ...prev, ...carDetailsDTO }));
                    setCarExtraInfo(prev => ({ ...prev, ...carExtraInfoDTO }));
                } else {
                    setError("Failed to fetch car listing data");
                    alert("Failed to fetch car listing data");
                }
            } catch (error) {
                console.error("Error fetching car listing:", error);
                setError("An error occurred while fetching the car listing data");
                alert("An error occurred while fetching the car listing data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCarListing();
    }, [carId]);

    // Handle form changes for car details
    const handleCarDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value, type } = e.target;

        setCarDetails(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value || "",
        }));
    };

    // Handle form changes for car extra info
    const handleExtraInfoChange = (e: React.ChangeEvent<HTMLElement>, category: keyof CarExtraInfoDTO) => {
        e.preventDefault();
        const { name, type, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        const updatedValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

        console.log(`Changing ${category} -> ${name}:`, updatedValue);

        setCarExtraInfo(prevState => ({
            ...prevState,
            [category]: {
                ...(prevState[category] || {}),
                [name.split(".").pop() as string]: updatedValue,
            },
        }));
    };

    // Submit the form
    const submitForm = async () => {
        if (!carId) return { success: false, message: "No car ID provided" };

        setIsSubmitting(true);
        try {
            console.log("Updating car with ID:", carId);
            console.log("Data being sent:", {
                carDetailsDTO: carDetails,
                carExtraInfoDTO: carExtraInfo,
            });

            const response = await axios.put(
                `http://localhost:8080/cars/update/${carId}`,
                {
                    carDetailsDTO: carDetails,
                    carExtraInfoDTO: carExtraInfo,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                return { success: true, message: "Car listing updated successfully" };
            } else {
                return { success: false, message: "Failed to update car listing" };
            }
        } catch (error) {
            console.error("Error updating car listing:", error);
            return { success: false, message: "An error occurred while updating the car listing" };
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        carDetails,
        carExtraInfo,
        isLoading,
        isSubmitting,
        error,
        handleCarDetailsChange,
        handleExtraInfoChange,
        submitForm,
    };
};

export default useCarEditDetails;
