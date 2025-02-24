"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { CarDetailsDTO, CarExtraInfoDTO } from '@/app/types/types';
import carExtraInfoFormData from "@/app/utils/CarExtraInfoFormData";
import carDetailsFormData from "@/app/utils/CarDetailsFormData";
import VehicleDetails from '@/app/components/CarRegistrationForm/VehicleDetails';
import SafetyEquipment from '@/app/components/CarRegistrationForm/SafetyEquipment';
import Additional from '@/app/components/CarRegistrationForm/AdditionalFeatures';
import ComfortFeatures from '@/app/components/CarRegistrationForm/ComfortFeatures';
import InteriorFeatures from '@/app/components/CarRegistrationForm/InteriorFeatures';
import LightsDetails from '@/app/components/CarRegistrationForm/LightsDetails';
import SportFeatures from '@/app/components/CarRegistrationForm/SportFeatures';
import Tires from '@/app/components/CarRegistrationForm/Tires';
import Link from "next/link";
import SteeringFeatures from "@/app/components/CarRegistrationForm/Steering";
import AudioVideoCommunicationFeatures from "@/app/components/CarRegistrationForm/AudioVideoCommunication";
import SeatsFeatures from "@/app/components/CarRegistrationForm/Seats";

interface CarListingResponse {
    carDetailsDTO: CarDetailsDTO;
    carExtraInfoDTO: CarExtraInfoDTO;
}

const CarDetailsForm: React.FC = () => {
    const router = useRouter();
    const { id } = useParams();

    const [carDetails, setCarDetails] = useState<CarDetailsDTO>(carDetailsFormData);
    const [carExtraInfo, setCarExtraInfo] = useState<CarExtraInfoDTO>(carExtraInfoFormData);

    useEffect(() => {
        if (!id) return; // Prevent unnecessary resets when `id` is undefined

        const fetchCarListing = async () => {
            try {
                const response = await axios.get<CarListingResponse>(`http://localhost:8080/cars/carlisting/${id}`, { withCredentials: true });

                if (response.status === 200) {
                    const { carDetailsDTO, carExtraInfoDTO } = response.data;

                    console.log("Fetched car details:", carDetailsDTO);
                    console.log("Fetched extra info:", carExtraInfoDTO);

                    setCarDetails(prev => ({ ...prev, ...carDetailsDTO })); // Preserve existing state
                    setCarExtraInfo(prev => ({ ...prev, ...carExtraInfoDTO }));
                } else {
                    alert('Failed to fetch car listing data');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while fetching the car listing data');
            }
        };

        fetchCarListing();
    }, [id]); // Fetch only when `id` is valid

    const handleCarDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault(); // Prevent any accidental form submission

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
        e.preventDefault(); // Prevent page reload

        const { name, type, value } = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        let updatedValue: string | boolean = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        console.log(`Changing ${category} -> ${name}:`, updatedValue);

        setCarExtraInfo(prevState => ({
            ...prevState,
            [category]: {
                ...(prevState[category] || {}), // Preserve existing category state
                [name.split('.').pop() as string]: updatedValue,
            },
        }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Make sure id is a string
            const carId = Array.isArray(id) ? id[0] : id;

            console.log('Updating car with ID:', carId);
            console.log('Data being sent:', {
                carDetailsDTO: carDetails,
                carExtraInfoDTO: carExtraInfo,
            });

            const response = await axios.put(`http://localhost:8080/cars/update/${carId}`, {
                carDetailsDTO: carDetails,
                carExtraInfoDTO: carExtraInfo,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                alert('Car listing updated successfully');
            } else {
                alert('Failed to update car listing');
            }
        } catch (error: any) {
            console.error('Error:', error);

            // Basic error logging without axios.isAxiosError
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received');
            } else {
                console.error('Error message:', error.message);
            }

            alert('An error occurred while updating the car listing');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="">
            <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
                <span className="flex items-center ml-[50px]">
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-lime-600 text-white font-bold mr-2">
                        1
                    </span>
                    <span>Sõiduki sisestamine</span>
                </span>
                <span className="flex items-center ml-16">
                    <Link href={`/users/lisa_pildid/${id}`} className="flex items-center">
                        <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                            2
                        </span>
                        <span>Piltide lisamine</span>
                    </Link>
                </span>
                <span className="flex items-center ml-16">
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        3
                    </span>
                    <span>Kuulutuse kinnitamine</span>
                </span>
            </div>

            <VehicleDetails formData={carDetails} handleChange={handleCarDetailsChange} />
            <h1 className="text-xl mb-2">Varustus</h1>
            <SafetyEquipment formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'safetyAndSecurity')} />
            <LightsDetails formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'lights')} />
            <Tires formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'tiresAndWheels')} />
            <SteeringFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'steering')} />
            <AudioVideoCommunicationFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'audioVideoCommunication')}/>
            <InteriorFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'interiorFeatures')} />
            <SeatsFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'seats')} />
            <ComfortFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'comfortFeatures')} />
            <SportFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'sportFeatures')} />
            <Additional formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'additional')} />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
            <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
                onClick={() => router.push(`/users/lisa_pildid/${id}`)}
            >
                Piltide lisamine
            </button>
        </form>
    );
};

export default CarDetailsForm;
