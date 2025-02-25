// CarFormSection.tsx
import React from 'react';
import VehicleDetails from '@/app/components/CarRegistrationForm/VehicleDetails';
import SafetyEquipment from '@/app/components/CarRegistrationForm/SafetyEquipment';
import Additional from '@/app/components/CarRegistrationForm/AdditionalFeatures';
import ComfortFeatures from '@/app/components/CarRegistrationForm/ComfortFeatures';
import InteriorFeatures from '@/app/components/CarRegistrationForm/InteriorFeatures';
import LightsDetails from '@/app/components/CarRegistrationForm/LightsDetails';
import SportFeatures from '@/app/components/CarRegistrationForm/SportFeatures';
import Tires from '@/app/components/CarRegistrationForm/Tires';
import SteeringFeatures from "@/app/components/CarRegistrationForm/Steering";
import AudioVideoCommunicationFeatures from "@/app/components/CarRegistrationForm/AudioVideoCommunication";
import SeatsFeatures from "@/app/components/CarRegistrationForm/Seats";
import { CarDetailsDTO, CarExtraInfoDTO } from '@/app/types/types';

interface CarFormSectionProps {
    carDetails: CarDetailsDTO;
    carExtraInfo: CarExtraInfoDTO;
    handleCarDetailsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleExtraInfoChange: (e: React.ChangeEvent<HTMLElement>, category: keyof CarExtraInfoDTO) => void;
}

const CarFormSection: React.FC<CarFormSectionProps> = ({
                                                           carDetails,
                                                           carExtraInfo,
                                                           handleCarDetailsChange,
                                                           handleExtraInfoChange
                                                       }) => {
    return (
        <>
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
        </>
    );
};

export default CarFormSection;
