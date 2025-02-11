import React from "react";
import { useParams } from "next/navigation";
import useCarDetails from "@/app/hooks/useCarDetails";
import CarInfo from "./CarInfo";
import CarExtraInfo from "./CarExtraInfo";
import CarImages from "./CarImages";

const CarDetails: React.FC = () => {
    const { slug } = useParams();
    if (typeof slug !== "string") {
        return <p>Invalid car slug or car not found</p>;
    }

    const { car, carExtraInfo, images, isLoading } = useCarDetails(slug);

    if (isLoading) return <p>Loading...</p>;
    if (!car) return <p>Car not found</p>;

    return (
        <div className="container">
            <header>
                <h1>{car.make} {car.model}</h1>
                <p>{car.bodyType} - {car.modelTrim} ({car.modelGeneration})</p>
            </header>

            <div className="grid grid-cols-2 gap-10 mt-5">
                <CarInfo car={car} />
                <CarImages images={images} car={car} />
            </div>

            <CarExtraInfo carExtraInfo={carExtraInfo} />
        </div>
    );
};

export default CarDetails;
