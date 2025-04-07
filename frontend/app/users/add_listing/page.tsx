"use client";
import React, { useState, useEffect } from 'react';
import { useCarForm } from "@/app/hooks/useCarForm";
import StepNavigation from "@/app/components/user/CarRegistrationProgress";
import CarFormSection from "@/app/components/CarDetails/CarFormSection";
import { useRouter } from 'next/navigation';

const CarDetailsForm: React.FC = () => {
    const {
        carDetails,
        carExtraInfo,
        handleCarDetailsChange,
        handleExtraInfoChange,
        submitCarListing
    } = useCarForm();
    const [error, setError] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [isAddListingPage, setIsAddListingPage] = useState(false);
    const router = useRouter();  // We'll use this to navigate after submission

    useEffect(() => {
        setIsClient(true);

        if (window.location.pathname.includes('/users/add_listing')) {
            setIsAddListingPage(true);
        }
    }, []);

    const isFormValid = () => {
        return Boolean(carDetails.vehicleType && carDetails.bodyType && carDetails.make);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isAddListingPage && !isFormValid()) {
            setError('Lisa kõigepealt liik, keretüüp ja mark');
            return;
        }

        await submitCarListing();  // Ensure the car listing is created before moving on
    };

    const handleStepClick = async () => {
        // Only submit if we are on the add listing page and the form is valid
        if (isAddListingPage && !isFormValid()) {
            setError('Lisa kõigepealt liik ja keretüüp');
            return;
        }

        try {
            // Submit the car listing before navigating
            await submitCarListing();

            // Wait for the car to be successfully created, then navigate
            if (carDetails.id) {
                // Add a small delay to ensure the `carId` is fully set before navigation
                setTimeout(() => {
                    router.push(`/users/lisa_pildid/${carDetails.id}`);  // Navigate after successful submission
                }, 500);  // Delay by 500ms
            } else {
                setError('Car ID not found after submission');
            }
        } catch (error) {
            console.error("Failed to submit car listing", error);
            setError('Failed to submit car listing');
        }
    };

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <StepNavigation
                currentStep={1}
                isFormValid={isAddListingPage ? isFormValid() : true}  // Conditional validation
                isAddListingPage={isAddListingPage}  // Pass isAddListingPage to StepNavigation
                handleStepClick={handleStepClick}  // Pass the handleStepClick function
            />
            <CarFormSection
                carDetails={carDetails}
                carExtraInfo={carExtraInfo}
                handleCarDetailsChange={handleCarDetailsChange}
                handleExtraInfoChange={handleExtraInfoChange}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <button type="submit" className="mt-4 p-2 bg-blue-600 text-white">
                Submit
            </button>
        </form>
    );
};

export default CarDetailsForm;
