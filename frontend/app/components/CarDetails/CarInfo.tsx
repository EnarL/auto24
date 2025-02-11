import React from "react";
import {CarDetailsDTO} from "@/app/types/types";

const CarInfo: React.FC<{ car: CarDetailsDTO }> = ({ car }) => {
    const carDetailsArray = [
        { label: "Liik", value: car.vehicleType },
        { label: "Keretüüp", value: car.bodyType },
        { label: "Esmane reg", value: car.firstRegistrationDate },
        { label: "Mootor", value: `${car.engineCapacityLiters} ${car.enginePowerKW}kW` },
        { label: "Kütus", value: car.fuelType },
        { label: "Läbisõidumõõdiku näit", value: `${car.odometerReading}km` },
        { label: "Vedav sild", value: car.driveType },
        { label: "Käigukast", value: car.transmission },
        { label: "Värvus", value: car.color },
        { label: "VIN-KOOD", value: car.vinCode },
        { label: "Hind", value: car.price },
    ];

    return (
        <div className="pt-2">
            {carDetailsArray.map((detail, index) => (
                <p key={index} className="text-lg mb-4 flex justify-between">
                    <span>{detail.label}:</span>
                    <span>{detail.value}</span>
                </p>
            ))}
        </div>
    );
};

export default CarInfo;
