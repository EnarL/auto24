"use client";
import React, { useState } from 'react';
import { useCarForm } from "@/app/hooks/useCarForm";
import StepNavigation from "@/app/components/user/CarRegistrationProgress";
import CarFormSection from "@/app/components/CarDetails/CarFormSection";
import { useRouter } from 'next/router';

const CarDetailsForm: React.FC = () => {
    const {
        carDetails,
        carExtraInfo,
        handleCarDetailsChange,
        handleExtraInfoChange,
        submitCarListing
    } = useCarForm();
    const [error, setError] = useState<string | null>(null);  // State to track form errors
    const router = useRouter();

    // Check if we're on the Add Listing page
    const isAddListingPage = router.pathname === '/users/add_listing'; // Adjust this to the correct path for your add listing page

    // Validate form fields
    const isFormValid = () => {
        return Boolean(carDetails.make && carDetails.bodyType);  // Check if required fields are filled
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isAddListingPage && !isFormValid()) {
            setError('Lisa kõigepealt liik ja keretüüp');  // Custom error message for validation failure
            return;  // Prevent form submission
        }

        try {
            await submitCarListing();
        } catch (error) {
            console.error("Failed to submit car listing", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Only pass isFormValid if we're on the Add Listing page */}
            <StepNavigation
                currentStep={1}
                isFormValid={isAddListingPage ? isFormValid() : true}  // Only validate on the Add Listing page
            />
            <CarFormSection
                carDetails={carDetails}
                carExtraInfo={carExtraInfo}
                handleCarDetailsChange={handleCarDetailsChange}
                handleExtraInfoChange={handleExtraInfoChange}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}  {/* Display error message */}
            <button type="submit" className="mt-4 p-2 bg-blue-600 text-white">
                Submit
            </button>
        </form>
    );
};

export default CarDetailsForm;
