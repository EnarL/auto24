"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import S3Image from "@/app/components/S3Image";
interface CarDetailsDTO {
    vehicleType: string;
    bodyType: string;
    bodyTypeDetail: string;
    model: string;
    make: string;
    modelGeneration: string;
    modelTrim: string;
    firstRegistrationDate: string;
    price: number;
    odometerReading: number;
    fuelType: string;
    engineDetails: string;
    enginePowerHP: number;
    transmission: string;
    locationCountry: string;
    locationCounty: string;
    description: string;
}
const CarDetails: React.FC = () => {
    const { slug } = useParams(); // Get the slug (car ID) from the URL
    const [car, setCar] = useState<CarDetailsDTO | null>(null);
    const [images, setImages] = useState<string[]>([]); // Initialize as empty array
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!slug) {
            console.error("Slug is missing, cannot fetch data.");
            return;
        }

        const fetchCarDetails = async () => {
            try {
                // Fetch car details
                const carResponse = await fetch(
                    `http://localhost:8080/cars/carlisting/${slug}`
                );
                if (carResponse.ok) {
                    const carData = await carResponse.json();
                    setCar(carData.carDetailsDTO); // Ensure correct property access
                } else {
                    console.error("Failed to fetch car details");
                }

                const imageResponse = await fetch(`http://localhost:8080/productImages/getCarImages/${slug}`);
                if (imageResponse.ok) {
                    const imageData: string[] = await imageResponse.json();
                    console.log("Fetched Images:", imageData); // Debugging

                    if (Array.isArray(imageData)) {
                        setImages(imageData);
                    } else {
                        console.error("Unexpected image response format:", imageData);
                        setImages([]);
                    }
                }

             else {
                    console.error("Failed to fetch images for car");
                }
            } catch (error) {
                console.error("Error fetching car details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCarDetails();
    }, [slug]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!car) {
        return <p>Car not found</p>;
    }

    return (
        <div className="container">
            <header>
                <h1 className="text-2xl">
                    {car.make} {car.model}
                </h1>
                <p className="text-sm">
                    {car.bodyType} - {car.modelTrim} ({car.modelGeneration})
                </p>
                <p className="text-xs pb-3 border-b-[1px] border-opacity-5 opacity-80 text-[10px]">
                    {car.firstRegistrationDate} | {car.odometerReading} km
                </p>
            </header>

            <div className="grid grid-cols-2 gap-10 mt-5">
                <div>
                    {/* Basic Car Details */}
                    <p>
                        <strong>Price:</strong> {car.price} EUR
                    </p>
                    <p>
                        <strong>Vehicle Type:</strong> {car.vehicleType}
                    </p>
                    <p>
                        <strong>Fuel Type:</strong> {car.fuelType}
                    </p>
                    <p>
                        <strong>Engine Details:</strong> {car.engineDetails}
                    </p>
                    <p>
                        <strong>Engine Power:</strong> {car.enginePowerHP} HP
                    </p>
                    <p>
                        <strong>Transmission:</strong> {car.transmission}
                    </p>
                    <p>
                        <strong>Location:</strong> {car.locationCounty}, {car.locationCountry}
                    </p>
                    <p>
                        <strong>Description:</strong> {car.description}
                    </p>
                </div>

                <div>
                    <div className="grid grid-rows-2 gap-4">
                        {images.length > 0 ? (
                            images.map((imageUrl, index) => (
                                <div key={index}>
                                    <S3Image
                                        src={imageUrl}
                                        alt={`${car.make} ${car.model} image ${index + 1}`}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No images available for this car.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
