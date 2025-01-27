"use client"

import React, { useState } from 'react';

const CarDetailsForm: React.FC = () => {
    const [formData, setFormData] = useState({
        images: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.files) {
            const newImages = [...formData.images];
            newImages[index] = e.target.files[0];
            setFormData({
                ...formData,
                images: newImages,
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
                <span className="flex items-center ml-[50px]">
                    <a href="kuuluta" className="flex items-center">
                        <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                            1
                        </span>
                        <span>Sõiduki sisestamine</span>
                    </a>
                </span>
                <span className="flex items-center ml-16">
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-lime-600 text-white font-bold mr-2">
                        2
                    </span>
                    <span>Piltide lisamine</span>
                </span>
                <span className="flex items-center ml-16">
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        3
                    </span>
                    <span>Teenuste tellimine</span>
                </span>
            </div>
            <p> – foto lisamine</p>
            <div className="border border-gray-300 p-8 w-[700px]">
                <div className="grid grid-cols-5 gap-8">
                    {Array.from({ length: 30 }).map((_, index) => (
                        <div key={index} className="relative h-20 w-28 border border-gray-300 flex items-center justify-center">
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleChange(e, index)}
                            />
                            <span className="text-white text-2xl flex items-center justify-center bg-orange-300 w-10 h-10 rounded-full border border-white">+</span>
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Submit
            </button>
        </form>
    );
};

export default CarDetailsForm;