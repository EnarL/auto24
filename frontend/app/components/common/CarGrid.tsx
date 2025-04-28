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
        gap-4
    `;

    return (
        <div className={columnClass}>
            {cars.slice(0, carCount).map((car) => (
                <Link href={`/cars/${car.id}`} key={car.id}>
                    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                            {carImages[car.id]?.length > 0 ? (
                                <S3Image
                                    src={carImages[car.id][0]}
                                    alt={`Car ${car.title} - Image 1`}
                                    className={`${imageWidth} ${imageHeight} object-cover`}
                                    loading="lazy"
                                />
                            ) : (
                                <div className={`${imageWidth} ${imageHeight} bg-gray-200 flex items-center justify-center`}>
                                    <p className="text-gray-500">No image available</p>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-sm p-2">
                                {car.title}
                            </div>
                        </div>
                        <div className="flex flex-col p-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm">{car.firstRegistrationDate}</span>
                                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    {car.price} €
                                </span>
                            </div>

                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CarGrid;