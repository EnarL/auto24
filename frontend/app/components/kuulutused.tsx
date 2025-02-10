import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import S3Image from "@/app/components/S3Image"; // Assuming you have an S3Image component for handling image rendering

interface CarPreviewDTO {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageKeys?: string[];  // Optional to handle cases when imageKeys is not present
}

interface CarGridProps {
    columns: number;
    rows: number;
    carCount: number;
}

const CarGrid: React.FC<CarGridProps> = ({ columns, rows, carCount }) => {
    const [cars, setCars] = useState<CarPreviewDTO[]>([]);  // State to hold car data
    const [carImages, setCarImages] = useState<Record<string, string[]>>({});  // Store car ID -> images map

    useEffect(() => {
        const fetchCarDetails = async () => {
            const response = await fetch('http://localhost:8080/car-details/preview');
            if (response.ok) {
                const carDetails: CarPreviewDTO[] = await response.json();
                setCars(carDetails);

                for (const car of carDetails) {
                    if (car.id) {
                        const imageResponse = await fetch(`http://localhost:8080/productImages/getCarImages/${car.id}`);
                        if (imageResponse.ok) {
                            const imageUrls: string[] = await imageResponse.json();
                            setCarImages((prevImages) => ({
                                ...prevImages,
                                [car.id]: imageUrls,
                            }));
                        } else {
                            console.error(`Failed to fetch images for car ${car.id}`);
                        }
                    }
                }
            } else {
                console.error('Failed to fetch car details');
            }
        };

        fetchCarDetails();
    }, []);

    return (
        <>
            <h1 className="text-1xl font-extralight font-thin opacity-65">VALIK KUULUTUSI</h1>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {cars.slice(0, carCount).map((car, index) => (
                    <Link href={`/cars/${car.id}`} key={index}>
                        <div className="flex flex-col border-2 border-gray-100 h-full">
                            <div className="flex">
                                {carImages[car.id]?.length > 0 ? (
                                    <S3Image
                                        src={carImages[car.id][0]}
                                        alt={`Car ${car.title} - Image 1`}
                                        className="object-cover w-full h-32"  // Fixed height, width full to container
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
