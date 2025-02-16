import React from 'react';
import Link from 'next/link';
import S3Image from "@/app/components/S3Image";
import useCarPreview from "@/app/hooks/useCarPreview";

interface CarGridProps {
    columns: number;
    carCount: number;
}

const CarGrid: React.FC<CarGridProps> = ({ columns, carCount }) => {
    const { cars, carImages, loading, error } = useCarPreview(); // Use the custom hook

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    return (
        <>
            <h1 className="text-1xl font-extralight opacity-65">VALIK KUULUTUSI</h1>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {cars.slice(0, carCount).map((car, index) => (
                    <Link href={`/cars/${car.id}`} key={index}>
                        <div className="flex flex-col border-2 border-gray-100 h-full">
                            <div className="flex">
                                {carImages[car.id]?.length > 0 ? (
                                    <S3Image
                                        src={carImages[car.id][0]}
                                        alt={`Car ${car.title} - Image 1`}
                                        className="object-cover w-full h-32"
                                    />
                                ) : (
                                    <p>No images available</p>
                                )}
                            </div>
                            <div className="flex flex-col p-2 flex-grow">
                                <div className="font-bold">{car.title}</div>
                                <div>{car.price} EUR</div>
                                <div>{car.firstRegistrationDate}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default CarGrid;
