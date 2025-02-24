import React from "react";
import Link from "next/link";

interface ProgressStepsProps {
    activeStep: number;
}

const steps = [
    { label: "Sõiduki sisestamine", href: "/users/lisa_sõiduk" },
    { label: "Piltide lisamine", href: "/users/lisa_pildid" },
    { label: "Kuulutuse kinnitamine", href: "/users/kinnitamine" }
];

const ProgressSteps: React.FC<ProgressStepsProps> = ({ activeStep }) => {
    return (
        <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
            {steps.map((step, index) => (
                <span key={index} className="flex items-center ml-16 first:ml-[50px]">
                    <Link href={step.href} className="flex items-center">
                        <span
                            className={`flex items-center justify-center w-[25px] h-[25px] rounded-full font-bold mr-2 
                                ${activeStep === index + 1 ? "bg-lime-600 text-white" : "bg-gray-200 text-white"}`}
                        >
                            {index + 1}
                        </span>
                        <span className={`${activeStep === index + 1 ? "font-bold" : "text-gray-500"}`}>
                            {step.label}
                        </span>
                    </Link>
                </span>
            ))}
        </div>
    );
};

export default ProgressSteps;
