"use client";

import React from "react";
import { useParams } from 'next/navigation';
import StepNavigation from "@/app/components/user/CarRegistrationProgress";
import useImageActions from "@/app/hooks/useImageActions";

const AddPictureForm: React.FC = () => {
    const { id } = useParams();
    const { imageData, loading, handleChange, handleSubmit, handleDelete } = useImageActions(id);

    if (loading) {
        return <div>Loading images...</div>;
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="">
            <StepNavigation currentStep={2} carId={id as string} />
            <p> – Foto lisamine</p>
            <div className="border border-gray-300 p-8 w-full md:w-[700px]">
                <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
                    {imageData.map((image, index) => (
                        <div key={index} className="relative h-32 w-full border border-gray-300 flex items-center justify-center">
                            {image ? (
                                <>
                                    <img
                                        src={image.url}
                                        alt={`Image ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        X
                                    </button>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                    <span className="text-white text-2xl flex items-center justify-center bg-orange-300 w-10 h-10 rounded-full border border-white">
                                        +
                                    </span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                disabled={!imageData.some(img => img?.isPreview)}
            >
                Lisa pilte
            </button>
        </form>
    );
};

export default AddPictureForm;
