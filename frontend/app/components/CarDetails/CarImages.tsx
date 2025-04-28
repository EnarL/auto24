import React, { useEffect, useState } from "react";
import S3Image from "@/app/components/common/S3Image";
import { CarDetailsDTO } from "@/app/types/types";

const CarImages: React.FC<{ images: string[], car: CarDetailsDTO }> = ({ images, car }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [isModalOpen]);

    if (!images.length) return null;

    // Display only the first 4 images as thumbnails
    const thumbnails = images.slice(0, 4);
    const additionalImagesCount = images.length > 4 ? images.length - 4 : 0;

    return (
        <div>
            <div
                className="relative overflow-hidden rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 h-80"
                onClick={() => setIsModalOpen(true)}
            >
                <S3Image
                    src={images[0]}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full"
                />
            </div>

            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-1 mt-1">
                    {thumbnails.map((image, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:opacity-90 h-24"
                            onClick={() => {
                                setSelectedImageIndex(index);
                                setIsModalOpen(true);
                            }}
                        >
                            <S3Image
                                src={image}
                                alt={`${car.make} ${car.model} view ${index + 1}`}
                                className="w-full h-full"
                            />

                            {index === 3 && additionalImagesCount > 0 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white font-medium">
                                    +{additionalImagesCount}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsModalOpen(false);
                    }}
                >
                    <div className="relative w-full max-w-4xl px-4">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-10 right-2 text-gray-400 hover:text-white p-2 z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="relative h-96 md:h-[70vh]">
                            <S3Image
                                src={images[selectedImageIndex]}
                                alt={`${car.make} ${car.model}`}
                                className="w-full h-full"
                                style={{ objectFit: "contain" }}
                            />

                            {/* Image counter */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                                {selectedImageIndex + 1} / {images.length}
                            </div>
                        </div>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
                                    }}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImageIndex((prev) => (prev + 1) % images.length);
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarImages;