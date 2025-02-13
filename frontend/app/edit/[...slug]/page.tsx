"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactDetails from "@/app/components/CarRegistrationForm/ContactDetails";
import VehicleDetails from "@/app/components/CarRegistrationForm/VehicleDetails";
import SafetyEquipment from "@/app/components/CarRegistrationForm/SafetyEquipment";
import AudioVideoCommunication from "@/app/components/CarRegistrationForm/AudioVideoCommunication";
import LightsDetails from "@/app/components/CarRegistrationForm/LightsDetails";
import Steering from "@/app/components/CarRegistrationForm/Steering";
import Tires from "@/app/components/CarRegistrationForm/Tires";
import InteriorFeatures from "@/app/components/CarRegistrationForm/InteriorFeatures";
import Seats from "@/app/components/CarRegistrationForm/Seats";
import ComfortFeatures from "@/app/components/CarRegistrationForm/ComfortFeatures";
import SportFeatures from "@/app/components/CarRegistrationForm/SportFeatures";
import AdditionalFeatures from "@/app/components/CarRegistrationForm/AdditionalFeatures";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';
import { CarDetailsDTO, CarExtraInfoDTO } from "@/app/types/types";

interface CarListingResponse {
    carDetailsDTO: CarDetailsDTO;
    carExtraInfoDTO: CarExtraInfoDTO;
}

const CarDetailsForm: React.FC = () => {
    const router = useRouter();
    const { slug } = useParams();
    const [formData, setFormData] = useState<CarDetailsDTO & CarExtraInfoDTO>({
        vehicleType: '',
        bodyType: '',
        bodyTypeDetail: '',
        model: '',
        make: '',
        modelGeneration: '',
        modelTrim: '',
        firstRegistrationDate: '',
        price: 0,
        includesRegistrationFee: false,
        discountPrice: false,
        exportPrice: false,
        odometerReading: 0,
        hasServiceBook: false,
        vinCode: '',
        registrationNumber: '',
        transmission: '',
        driveType: '',
        engineCapacityLiters: 0,
        engineCapacityCubicCentimeters: 0,
        engineConfiguration: '',
        engineDetails: '',
        enginePowerKW: 0,
        enginePowerHP: 0,
        fuelType: '',
        fuelTankCapacity: 0,
        fuelConsumptionHighway: 0,
        fuelConsumptionCity: 0,
        fuelConsumptionCombined: 0,
        fuelConsumptionStandard: '',
        co2Emissions: 0,
        seatingCapacity: 0,
        numberOfDoors: 0,
        hasWarranty: false,
        accidentDamaged: false,
        color: '',
        metallicColor: false,
        colorDetail: '',
        curbWeight: 0,
        grossWeight: 0,
        payloadCapacity: 0,
        brakedTrailerWeight: 0,
        unbrakedTrailerWeight: 0,
        wheelbase: 0,
        length: 0,
        width: 0,
        height: 0,
        acceleration0To100: 0,
        topSpeed: 0,
        locationCountry: 'Eesti',
        locationCounty: '',
        importedFromCountry: '',
        registeredInCountry: false,
        inspectionValidUntil: '',
        reserved: false,
        reservationUntilDate: '',
        exchangePossible: false,
        exchangeDetails: '',
        description: '',
        safetyAndSecurity: {},
        lights: {},
        tiresAndWheels: {},
        steering: {},
        seats: {},
        comfortFeatures: {},
        additionalFeatures: {},
        sportFeatures: {},
        audioVideoCommunication: {},
        interiorFeatures: {},
    });

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
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/cars/carlisting', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 201) {
                alert('Car listing created successfully');
                router.push('lisa_pildid');
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
                    <span>Teenuste tellimine</span>
                </span>
            </div>

            <VehicleDetails formData={formData} handleChange={handleChange} />
            <h1 className="text-xl mb-2">Varustus</h1>
            <SafetyEquipment formData={formData} handleChange={handleChange} />
            <LightsDetails formData={formData} handleChange={handleChange} />
            <Tires formData={formData} handleChange={handleChange} />
            <Steering formData={formData} handleChange={handleChange} />
            <AudioVideoCommunication formData={formData} handleChange={handleChange} />
            <InteriorFeatures formData={formData} handleChange={handleChange} />
            <Seats formData={formData} handleChange={handleChange} />
            <ComfortFeatures formData={formData} handleChange={handleChange} />
            <SportFeatures formData={formData} handleChange={handleChange} />
            <AdditionalFeatures formData={formData} handleChange={handleChange} />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
};

export default CarDetailsForm;