import React, { useState } from "react";
import S3Image from "@/app/components/S3Image";
import { CarDetailsDTO } from "@/app/types/types";

const CarImages: React.FC<{ images: string[], car: CarDetailsDTO }> = ({ images, car }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goToNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousImage = () => {
        setSelectedImageIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div>
            {/* Main image */}
            <div className="mb-4">
                <div
                    onClick={() => openModal(selectedImageIndex)}
                    className="cursor-pointer"
                >
                    <S3Image
                        src={images[selectedImageIndex]}
                        alt={`Main image of ${car.make} ${car.model}`}
                        className="w-full h-auto object-contain max-h-[80vh] mx-auto"
                    />
                </div>
            </div>
            <div className="flex justify-center gap-4 mb-4">
                {images.map((imageUrl, index) => (
                    <div
                        key={index}
                        className="relative cursor-pointer"
                        onClick={() => setSelectedImageIndex(index)}
                    >
                        <S3Image
                            src={imageUrl}
                            alt={`${car.make} ${car.model} thumbnail ${index + 1}`}
                            className={`w-[100px] h-[100px] object-cover border-2 border-gray-300 rounded-lg ${
                                index === selectedImageIndex ? 'border-blue-500' : ''
                            }`}
                        />
                    </div>
                ))}
            </div>

            {/* Modal for enlarged view */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative w-full max-w-4xl h-auto p-4">
                        <button
                            onClick={closeModal}
                            className="absolute top-0 right-0 text-white bg-black rounded-full p-2"
                        >
                            X
                        </button>
                        <div className="relative">
                            <img
                                src={images[selectedImageIndex]}
                                alt={`Enlarged view of ${car.make} ${car.model}`}
                                className="w-full h-auto object-contain max-h-[80vh] mx-auto"
                            />
                            {/* Navigation buttons */}
                            <button
                                onClick={goToPreviousImage}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
                            >
                                ←
                            </button>
                            <button
                                onClick={goToNextImage}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarImages;
