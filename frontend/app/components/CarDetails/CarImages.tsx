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

    const visibleImages = images.slice(0, 4); // Get the first four images
    const additionalImagesCount = images.length > 4 ? images.length - 4 : 0; // Count additional images

    return (
        <div>
            <div className="mb-4">
                <div
                    onClick={() => openModal(0)} // Click on the big image opens the modal with the first image
                    className="cursor-pointer"
                >
                    <S3Image
                        src={images[0]} // Always display the first image
                        alt={`Main image of ${car.make} ${car.model}`}
                        className="w-full md:pr-0 pr-4 h-auto max-h-[40vh] md:max-h-[60vh] mx-auto border rounded-lg shadow-md"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {visibleImages.map((imageUrl, index) => (
                    <div
                        key={index}
                        className="relative cursor-pointer transition-transform transform hover:scale-105"
                        onClick={() => openModal(index)} // Click on thumbnails opens the modal with the clicked image
                    >
                        <S3Image
                            src={imageUrl}
                            alt={`${car.make} ${car.model} thumbnail ${index + 1}`}
                            className="w-max h-[100px] object-cover border-2 border-gray-300 rounded-lg"
                        />
                        {index === 3 && additionalImagesCount > 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-orange-500 rounded-lg">
                                <span>+{additionalImagesCount} more</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

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
