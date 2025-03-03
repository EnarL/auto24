"use client";
import React from 'react';
import { useCarForm } from "@/app/hooks/useCarForm";
import StepNavigation from "@/app/components/user/CarRegistrationProgress";
import CarFormSection from "@/app/components/CarDetails/CarFormSection";

const CarDetailsForm: React.FC = () => {
    const {
        carDetails,
        carExtraInfo,
        handleCarDetailsChange,
        handleExtraInfoChange,
        submitCarListing
    } = useCarForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitCarListing();
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <StepNavigation currentStep={1}/>
            <CarFormSection
                carDetails={carDetails}
                carExtraInfo={carExtraInfo}
                handleCarDetailsChange={handleCarDetailsChange}
                handleExtraInfoChange={handleExtraInfoChange}
            />
            <button type="submit" className="mt-4 p-2 bg-blue-600 text-white">Submit</button>
        </form>
    );
};

export default CarDetailsForm;