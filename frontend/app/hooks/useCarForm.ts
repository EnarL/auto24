import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { CarDetailsDTO, CarExtraInfoDTO } from "@/app/types/types";
import carExtraInfoFormData from "@/app/utils/CarExtraInfoFormData";
import carDetailsFormData from "@/app/utils/CarDetailsFormData";

export const useCarForm = () => {
    const router = useRouter();
    const [carDetails, setCarDetails] = useState<CarDetailsDTO>(carDetailsFormData);
    const [carExtraInfo, setCarExtraInfo] = useState<CarExtraInfoDTO>(carExtraInfoFormData);

    const handleCarDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setCarDetails(prevState => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            setCarDetails(prevState => ({
                ...prevState,
                [name]: value || '',
            }));
        }
    };

    const handleExtraInfoChange = (e: React.ChangeEvent<HTMLElement>, category: keyof CarExtraInfoDTO) => {
        const { name, type, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        let updatedValue: string | boolean;

        if (type === 'checkbox') {
            updatedValue = (e.target as HTMLInputElement).checked;
        } else {
            updatedValue = value;
        }
        setCarExtraInfo(prevState => {
            const currentCategory = prevState[category] || {};
            return {
                ...prevState,
                [category]: {
                    ...currentCategory,
                    [name.split('.').pop() as string]: updatedValue,
                },
            };
        });
    };

    const submitCarListing = async () => {
        const carListingRequest = {
            carDetailsDTO: carDetails,
            carExtraInfoDTO: carExtraInfo,
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cars/create`, carListingRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 201) {
                alert('Car listing created successfully');
                const id = response.data;
                router.push(`/users/lisa_pildid/${id}`);
                return true;
            } else {
                alert('Failed to create car listing');
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the car listing');
            return false;
        }
    };

    return {
        carDetails,
        carExtraInfo,
        handleCarDetailsChange,
        handleExtraInfoChange,
        submitCarListing
    };
};

export default useCarForm;