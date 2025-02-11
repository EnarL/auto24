import React, { useState } from "react";
import S3Image from "@/app/components/S3Image";
import { CarDetailsDTO } from "@/app/types/types";

const CarImages: React.FC<{ images: string[], car: CarDetailsDTO }> = ({ images, car }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Function to open the modal when an image is clicked
    const openModal = (imageUrl: string) => {
        setSelectedImage(imageUrl); // Set selected image URL
        setIsModalOpen(true); // Open modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close modal
        setSelectedImage(null); // Clear selected image
    };

    return (
        <div>
            <div className="grid grid-rows-2 gap-4">
                {images.length > 0 ? (
                    images.map((imageUrl, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer"
                            onClick={() => openModal(imageUrl)}
                        >
                            <S3Image
                                src={imageUrl}
                                alt={`${car.make} ${car.model} image ${index + 1}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    ))
                ) : (
                    <p>No images available for this car.</p>
                )}
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
                        <img
                            src={selectedImage!}
                            alt={`Enlarged view of ${car.make} ${car.model}`}
                            className="w-full h-auto object-contain max-h-[80vh] mx-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarImages;
