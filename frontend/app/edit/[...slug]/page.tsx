"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { CarDetailsDTO, CarExtraInfoDTO } from '@/app/types/types';
import { initialFormData } from '@/app/data/InitialFormData';
import VehicleDetails from '@/app/components/CarRegistrationForm/VehicleDetails';
import SafetyEquipment from '@/app/components/CarRegistrationForm/SafetyEquipment';
import AdditionalFeatures from '@/app/components/CarRegistrationForm/AdditionalFeatures';
import AudioVideoCommunication from '@/app/components/CarRegistrationForm/AudioVideoCommunication';
import ComfortFeatures from '@/app/components/CarRegistrationForm/ComfortFeatures';
import InteriorFeatures from '@/app/components/CarRegistrationForm/InteriorFeatures';
import LightsDetails from '@/app/components/CarRegistrationForm/LightsDetails';
import Seats from '@/app/components/CarRegistrationForm/Seats';
import SportFeatures from '@/app/components/CarRegistrationForm/SportFeatures';
import Steering from '@/app/components/CarRegistrationForm/Steering';
import Tires from '@/app/components/CarRegistrationForm/Tires';

interface CarListingResponse {
    carDetailsDTO: CarDetailsDTO;
    carExtraInfoDTO: CarExtraInfoDTO;
}

const CarDetailsForm: React.FC = () => {
    const router = useRouter();
    const { slug } = useParams();
    const [formData, setFormData] = useState<CarDetailsDTO & CarExtraInfoDTO>(initialFormData);

    useEffect(() => {
        const fetchCarListing = async () => {
            try {
                const response = await axios.get<CarListingResponse>(`http://localhost:8080/cars/carlisting/${slug}`, { withCredentials: true });
                if (response.status === 200) {
                    const { carDetailsDTO, carExtraInfoDTO } = response.data;
                    setFormData({ ...carDetailsDTO, ...carExtraInfoDTO });
                } else {
                    alert('Failed to fetch car listing data');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while fetching the car listing data');
            }
        };

        fetchCarListing();
    }, [slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const [parent, child] = name.split('.');

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...(prevData[parent as keyof typeof prevData] as any),
                    [child]: checked,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [parent]: {
                    ...(prevData[parent as keyof typeof prevData] as any),
                    [child]: value || '',
                },
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/cars/update/${slug}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 201) {
                alert('Car listing created successfully');
                router.push('lisa_pildid');
            } else {
                alert('Failed to update car listing');
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
                    <span>Teenuste tellimine</span>
                </span>
            </div>

            <VehicleDetails formData={formData} handleChange={handleChange} />
            <h1 className="text-xl mb-2">Varustus</h1>
            <SafetyEquipment formData={formData} handleChange={handleChange} />
            <AdditionalFeatures formData={formData} handleChange={handleChange} />
            <AudioVideoCommunication formData={formData} handleChange={handleChange} />
            <ComfortFeatures formData={formData} handleChange={handleChange} />
            <InteriorFeatures formData={formData} handleChange={handleChange} />
            <LightsDetails formData={formData} handleChange={handleChange} />
            <Seats formData={formData} handleChange={handleChange} />
            <SportFeatures formData={formData} handleChange={handleChange} />
            <Steering formData={formData} handleChange={handleChange} />
            <Tires formData={formData} handleChange={handleChange} />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
};

export default CarDetailsForm;