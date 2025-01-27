"use client"

import React, { useState } from 'react';
import ContactDetails from "@/app/components/ContactDetails";
import VehicleDetails from "@/app/components/VehicleDetails";
import SafetyEquipment from "@/app/components/SafetyEquipment";
import AudioVideoCommunication from "@/app/components/AudioVideoCommunication";
import LightsDetails from "@/app/components/LightsDetails";
import Steering from "@/app/components/Steering";
import Tires from "@/app/components/Tires";
import InteriorFeatures from "@/app/components/InteriorFeatures";
import Seats from "@/app/components/Seats";
import ComfortFeatures from "@/app/components/ComfortFeatures";
import SportFeatures from "@/app/components/SportFeatures";
import AdditionalFeatures from "@/app/components/AdditionalFeatures";
import {useRouter} from "next/navigation";
const CarDetailsForm: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        phone: '',
        name: 'Enar Leini',
        email: 'enar.leini00@gmail.com',
        vehicleType: '',
        bodyType: '',
        brand: '',
        model: '',
        modelName: '',
        modelGeneration: '',
        modelTrim: '',
        firstRegistrationMonth: '',
        firstRegistrationYear: '',
        price: '',
        mileage: '',
        hasServiceBook: false,
        vinCode: '',
        registrationNumber: '',
        transmission: '',
        driveType: '',
        engineCapacityLiters: '',
        engineCapacityCubicCentimeters: '',
        engineConfiguration: '',
        engineDetails: '',
        enginePowerKW: '',
        fuelTankCapacity: '',
        fuelConsumptionHighway: '',
        fuelConsumptionCity: '',
        fuelConsumptionCombined: '',
        fuelConsumptionStandard: '',
        co2Emissions: '',
        seatingCapacity: '',
        numberOfDoors: '',
        hasWarranty: false,
        isAccidentDamaged: false,
        color: '',
        isMetallicColor: false,
        colorDetail: '',
        curbWeight: '',
        grossWeight: '',
        payloadCapacity: '',
        brakedTrailerWeight: '',
        unbrakedTrailerWeight: '',
        wheelbase: '',
        length: '',
        width: '',
        height: '',
        acceleration0To100: '',
        topSpeed: '',
        locationCountry: 'Eesti',
        locationCounty: '',
        importedFromCountry: '',
        registeredInCountry: false,
        inspectionValidUntil: '',
        isReserved: false,
        reservationUntilDate: '',
        exchangePossible: false,
        exchangeDetails: '',
        description: '',
        equipment: '',
        powerSteering: false,
        centralLocking: false,
        absBrakes: false,
        electronicParkingBrake: false,
        airbag: false,
        curtainAirbags: false,
        passengerAirbagDeactivation: false,
        driverFatigueDetection: false,
        alarm: false,
        immobilizer: false,
        stabilityControl: false,
        brakeForceControl: false,
        tractionControl: false,
        laneKeepingAssist: false,
        laneChangeAssist: false,
        trafficSignRecognition: false,
        nightVisionAssist: false,
        blindSpotWarning: false,
        collisionPreventionBrake: false,
        pedestrianSafetyHood: false,
        automaticBrakingSystem: false,
        additionalBrakeLight: false,
        rainSensor: false,
        isofix: false,
        integratedChildSeat: false,
        seatbeltPretensioners: false,
        autoHold: false,
        hillBrake: false,
    });

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        router.push('lisa_pildid');
    };

    return (

        <form onSubmit={handleSubmit} className="">
            <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
                <span className="flex items-center ml-[50px]">

                        <span
                            className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-lime-600 text-white font-bold mr-2">
                            1
                        </span>
                        <span>Sõiduki sisestamine</span>
                </span>
                <span className="flex items-center ml-16">
                    <span
                        className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        2
                    </span>
                    <span>Piltide lisamine</span>
                </span>
                <span className="flex items-center ml-16">
                    <span
                        className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        3
                    </span>
                    <span>Teenuste tellimine</span>
                </span>
            </div>

            <ContactDetails formData={formData} handleChange={handleChange}/>
            <VehicleDetails formData={formData} handleChange={handleChange}/>
            <h1 className="text-xl mb-2">Varustus</h1>
            <SafetyEquipment formData={formData} handleChange={handleChange}/>
            <LightsDetails formData={formData} handleChange={handleChange}/>
            <Tires formData={formData} handleChange={handleChange}/>
            <Steering formData={formData} handleChange={handleChange}/>
            <AudioVideoCommunication formData={formData} handleChange={handleChange}/>
            <InteriorFeatures formData={formData} handleChange={handleChange}/>
            <Seats formData={formData} handleChange={handleChange}/>
            <ComfortFeatures formData={formData} handleChange={handleChange}/>
            <SportFeatures formData={formData} handleChange={handleChange}/>
            <AdditionalFeatures formData={formData} handleChange={handleChange}/>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>

        </form>
    )

};

export default CarDetailsForm;