"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useCarEditDetails } from '@/app/hooks/useCarEditDetails';
import StepNavigation from '@/app/components/user/CarRegistrationProgress';
import CarFormSection from '@/app/components/CarDetails/CarFormSection';
import SubmissionButtons from '@/app/components/user/SubmissionButtons';

const CarDetailsForm: React.FC = () => {
    const { id } = useParams();
    const {
        carDetails,
        carExtraInfo,
        isLoading,
        error,
        handleCarDetailsChange,
        handleExtraInfoChange,
        submitForm
    } = useCarEditDetails(id);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await submitForm();
        alert(result.message);
    };

    if (isLoading) {
        return <div className="p-4">Loading car details...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <StepNavigation currentStep={1} carId={id as string} />
            {error && <div className="text-red-500 p-2">{error}</div>}

            <CarFormSection
                carDetails={carDetails}
                carExtraInfo={carExtraInfo}
                handleCarDetailsChange={handleCarDetailsChange}
                handleExtraInfoChange={handleExtraInfoChange}
            />
            <SubmissionButtons
                carId={id as string}
            />
        </form>
    );
};

export default CarDetailsForm;