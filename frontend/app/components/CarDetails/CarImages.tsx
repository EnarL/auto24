import React from "react";
import S3Image from "@/app/components/S3Image";
import {CarDetailsDTO} from "@/app/types/types";

const CarImages: React.FC<{ images: string[], car: CarDetailsDTO }> = ({ images, car }) => {
    return (
        <div>
            <div className="grid grid-rows-2 gap-4">
                {images.length > 0 ? (
                    images.map((imageUrl, index) => (
                        <S3Image
                            key={index}
                            src={imageUrl}
                            alt={`${car.make} ${car.model} image ${index + 1}`}
                        />
                    ))
                ) : (
                    <p>No images available for this car.</p>
                )}
            </div>
        </div>
    );
};

export default CarImages;
