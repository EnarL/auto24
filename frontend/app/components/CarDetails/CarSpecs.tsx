import React from 'react';
import { CarDetailsDTO } from "@/app/types/types";

interface CarSpecsProps {
    car: CarDetailsDTO;
}

const CarSpecs: React.FC<CarSpecsProps> = ({ car }) => {
    return (
        <div className="car-specs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

            {/* Kere Section */}
            <div className="spec-section">
                <h4 className="text-lg font-semibold mb-2">KERE</h4>
                <ul className="space-y-2 ">
                    <li>Istekohti: {car.seatingCapacity}</li>
                    <li>Uste arv: {car.numberOfDoors}</li>
                    <li>Pikkus: {car.length} mm</li>
                    <li>Laius: {car.width} mm</li>
                    <li>Kõrgus: {car.height} mm</li>
                </ul>
            </div>

            {/* Massid, Mõõdud Section */}
            <div className="spec-section">
                <h4 className="text-lg font-semibold mb-2">MASSID, MÕÕDUD</h4>
                <ul className="space-y-2 ">
                    <li>Tühimass: {car.curbWeight} kg</li>
                    <li>Täismass: {car.grossWeight} kg</li>
                    <li>Kandevõime: {car.payloadCapacity} kg</li>
                    <li>Piduriga haagis: {car.brakedTrailerWeight} kg</li>
                    <li>Pidurita haagis: {car.unbrakedTrailerWeight} kg</li>
                    <li>Teljevahe: {car.wheelbase} mm</li>
                </ul>
            </div>

            {/* Mootor Section */}
            <div className="spec-section">
                <h4 className="text-lg font-semibold mb-2">MOOTOR</h4>
                <ul className="space-y-2 ">
                    <li>Mootori maht: {car.engineCapacityLiters} l</li>
                    <li>Võimsus: {car.enginePowerHP} HP</li>
                    <li>Tippkiirus: {car.topSpeed} km/h</li>
                    <li>Mootori maht: {car.engineCapacityCubicCentimeters} cm³</li>
                    <li>CO2 (WLTP): {car.co2Emissions} g/km</li>
                </ul>
            </div>

            {/* Kütus Section */}
            <div className="spec-section">
                <h4 className="text-lg font-semibold mb-2">KÜTUS</h4>
                <ul className="space-y-2 ">
                    <li>Kütus: {car.fuelType}</li>
                    <li>Kütusekulu (WLTP):</li>
                    <ul className="space-y-1 pl-4">
                        <li>- Keskmine: {car.fuelConsumptionCombined} l/100 km</li>
                    </ul>
                </ul>
            </div>

            {/* Teljed Section */}
            <div className="spec-section">
                <h4 className="text-lg font-semibold mb-2">TELJED</h4>
                <ul className="space-y-2 ">
                    <li>Sildade arv: 2</li>
                </ul>
            </div>

        </div>
    );
};

export default CarSpecs;
