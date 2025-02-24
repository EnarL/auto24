"use client";
import React, { useState } from 'react';
import axios from 'axios';
import ContactDetails from "@/app/components/CarRegistrationForm/ContactDetails";
import VehicleDetails from "@/app/components/CarRegistrationForm/VehicleDetails";
import SafetyEquipment from "@/app/components/CarRegistrationForm/SafetyEquipment";
import AudioVideoCommunicationFeatures from "@/app/components/CarRegistrationForm/AudioVideoCommunication";
import LightsDetails from "@/app/components/CarRegistrationForm/LightsDetails";
import SteeringFeatures from "@/app/components/CarRegistrationForm/Steering";
import Tires from "@/app/components/CarRegistrationForm/Tires";
import InteriorFeatures from "@/app/components/CarRegistrationForm/InteriorFeatures";
import SeatsFeatures from "@/app/components/CarRegistrationForm/Seats";
import ComfortFeatures from "@/app/components/CarRegistrationForm/ComfortFeatures";
import SportFeatures from "@/app/components/CarRegistrationForm/SportFeatures";
import Additional from "@/app/components/CarRegistrationForm/AdditionalFeatures";
import { useRouter } from "next/navigation";
import { CarDetailsDTO, CarExtraInfoDTO } from "@/app/types/types";
import carExtraInfoFormData from "@/app/utils/CarExtraInfoFormData";
import carDetailsFormData from "@/app/utils/CarDetailsFormData"; // Adjust the import path as necessary

const CarDetailsForm: React.FC = () => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const carListingRequest = {
            carDetailsDTO: carDetails,
            carExtraInfoDTO: carExtraInfo,
        };
        try {
            const response = await axios.post('http://localhost:8080/cars/create', carListingRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 201) {
                alert('Car listing created successfully');
                const id = response.data;
                router.push(`/users/lisa_pildid/${id}`);
            } else {
                alert('Failed to create car listing');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the car listing');
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
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        2
                    </span>
                    <span>Piltide lisamine</span>
                </span>
                <span className="flex items-center ml-16">
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        3
                    </span>
                    <span>Ostmine / vahetus</span>
                </span>
            </div>
            <ContactDetails formData={carDetails} handleChange={handleCarDetailsChange} />
            <VehicleDetails formData={carDetails} handleChange={handleCarDetailsChange} />
            <h1 className="text-xl mb-2">Varustus</h1>
            <SafetyEquipment formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'safetyAndSecurity')} />
            <LightsDetails formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'lights')} />
            <Tires formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'tiresAndWheels')} />
            <SteeringFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'steering')} />
            <AudioVideoCommunicationFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'audioVideoCommunication')} />
            <InteriorFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'interiorFeatures')} />
            <SeatsFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'seats')} />
            <ComfortFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'comfortFeatures')} />
            <SportFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'sportFeatures')} />
            <Additional formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'additional')} />
            <button type="submit" className="mt-4 p-2 bg-blue-600 text-white">Submit</button>
        </form>
    );
};

export default CarDetailsForm;
