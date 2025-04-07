import React from 'react';
import Link from 'next/link';
import S3Image from "@/app/components/common/S3Image";

interface CarPreviewDTO {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageKeys?: string[];
}

interface CarGridProps {
    columns?: {
        sm?: number;
        md?: number;
        lg?: number;
    };
    carCount: number;
    cars: CarPreviewDTO[];
    carImages: Record<string, string[]>;
    loading: boolean;
    error: string | null;
    imageHeight?: string;
    imageWidth?: string;
}

const CarGrid: React.FC<CarGridProps> = ({
                                             columns = { sm: 2, lg: 6 },
                                             carCount,
                                             cars,
                                             carImages,
                                             loading,
                                             error,
                                             imageHeight = "h-32",
                                             imageWidth = "w-full"
                                         }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    const columnClasses: Record<string, string> = {
        "1": 'grid-cols-1',
        "2": 'grid-cols-2',
        "3": 'grid-cols-3',
        "4": 'grid-cols-4',
        "5": 'grid-cols-5',
        "6": 'grid-cols-6',
    };

    const columnClass = `
        grid 
        ${columnClasses[String(columns.sm || 2)]} 
        md:${columnClasses[String(columns.md || 4)]} 
        lg:${columnClasses[String(columns.lg || 6)]}
        md:gap-2
    `;

    return (
        <div className={columnClass}>
            {cars.slice(0, carCount).map((car) => (
                <Link href={`/cars/${car.id}`} key={car.id}>
                    <div className="flex flex-col border-2 border-gray-100 h-full">
                        <div className="flex">
                            {carImages[car.id]?.length > 0 ? (
                                <S3Image
                                    src={carImages[car.id][0]}
                                    alt={`Car ${car.title} - Image 1`}
                                    className={`${imageWidth} ${imageHeight}`}
                                    style={{ objectFit: "cover" }}
                                    loading="lazy"
                                />
                            ) : (
                                <p>No images available</p>
                            )}
                        </div>
                        <div className="flex flex-col p-2 flex-grow">
                            <div className="flex-grow">{car.title}</div>
                            <div className="flex justify-between items-center text-[12px]">
                                <div className="text-gray-600">{car.firstRegistrationDate}</div>
                                <div className="text-right">{car.price} €</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CarGrid;
