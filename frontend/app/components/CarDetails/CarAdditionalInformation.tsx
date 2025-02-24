import React from "react";

import { CarDetailsDTO } from "@/app/types/types";

interface CarProps {
    car: CarDetailsDTO;
}

const CarDetails: React.FC<CarProps> = ({ car }) => {
    return (
        <div className="car-details m-1 mt-4">
            <p>
                Ülevaatus kuni: <strong>{car.inspectionValidUntil}</strong>
            </p>
            <p>
                Ostetud riigist: <strong>{car.importedFromCountry}</strong>
            </p>
            <p>
                Sõiduki asukoht: <strong>{car.locationCounty}</strong>, {car.locationCountry}
            </p>
            <p className="mt-2">{car.description}</p>
        </div>
    );
};

export default CarDetails;
