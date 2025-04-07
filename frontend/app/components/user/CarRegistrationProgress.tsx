import React from 'react';
import Link from 'next/link';

interface StepNavigationProps {
    currentStep: number;
    carId?: string;
    isFormValid?: boolean;  // Pass the form validation result as a prop
}

const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, carId, isFormValid }) => {
    return (
        <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
            <span className="flex items-center ml-[50px]">
                <Link href={`/users/edit/${carId}`} className={`flex items-center ${currentStep === 1 ? '' : ''}`}>
                    <span className={`flex items-center justify-center w-[25px] h-[25px] rounded-full ${currentStep === 1 ? 'bg-lime-600' : 'bg-gray-200'} text-white mr-2`}>
                        1
                    </span>
                </Link>
                <span>Sõiduki sisestamine</span>
            </span>
            <span className="flex items-center ml-16">
                <Link href={`/users/lisa_pildid/${carId}`} className={`flex items-center`}>
                    <span className={`flex items-center justify-center w-[25px] h-[25px] rounded-full ${currentStep === 2 ? 'bg-lime-600' : 'bg-gray-200'} text-white mr-2`}>
                        2
                    </span>
                    <span>Piltide lisamine</span>
                </Link>
            </span>
            <span className="flex items-center ml-16">
                <Link href={`/users/confirm_listing/${carId}`} className={`flex items-center`}>
                    <span className={`flex items-center justify-center w-[25px] h-[25px] rounded-full ${currentStep === 3 ? 'bg-lime-600' : 'bg-gray-200'} text-white mr-2`}>
                        3
                    </span>
                    <span>Kuulutuse kinnitamine</span>
                </Link>
            </span>
        </div>
    );
};

export default StepNavigation;
