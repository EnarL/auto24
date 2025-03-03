import React from 'react';
import Link from 'next/link';

interface StepNavigationProps {
    currentStep: number;
    carId?: string;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ currentStep, carId }) => {
    return (
        <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
            <span className="flex items-center ml-[50px]">
                <Link href={`/users/edit/${carId}`} className="flex items-center">
                    <span className={`flex items-center justify-center w-[25px] h-[25px] rounded-full ${currentStep === 1 ? 'bg-lime-600' : 'bg-gray-200'} text-white mr-2`}>
                        1
                    </span>
                </Link>
                <span className={`${currentStep === 1 ? '' : ''}`}>Sõiduki sisestamine</span>
            </span>
            <span className="flex items-center ml-16">
                <Link href={`/users/lisa_pildid/${carId}`} className="flex items-center">
                    <span className={`flex items-center justify-center w-[25px] h-[25px] rounded-full ${currentStep === 2 ? 'bg-lime-600' : 'bg-gray-200'} text-white  mr-2`}>
                        2
                    </span>
                    <span className={`${currentStep === 2 ? '' : ''}`}>Piltide lisamine</span>
                </Link>
            </span>
            <span className="flex items-center ml-16">
                <Link href={`/users/confirm_listing/${carId}`} className="flex items-center">
                    <span className={`flex items-center justify-center w-[25px] h-[25px] rounded-full ${currentStep === 3 ? 'bg-lime-600' : 'bg-gray-200'} text-white mr-2`}>
                        3
                    </span>
                    <span className={`${currentStep === 3 ? '' : ''}`}>Kuulutuse kinnitamine</span>
                </Link>
            </span>
        </div>
    );
};

export default StepNavigation;
