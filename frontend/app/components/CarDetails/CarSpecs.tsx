import React from 'react';
import { CarDetailsDTO } from "@/app/types/types";

interface CarSpecsProps {
    car: CarDetailsDTO;
}

const CarSpecs: React.FC<CarSpecsProps> = ({ car }) => {
    // Check if any property has a value to decide whether to render the component


    return (
        <div className="car-specs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {(
                car.seatingCapacity ||
                car.numberOfDoors ||
                car.length ||
                car.width ||
                car.height
            ) ? (
                <div className="spec-section p-4 border rounded-lg shadow-md bg-gray-50">
                    <h4 className="text-lg font-semibold mb-2">KERE</h4>
                    <ul className="space-y-2">
                        {car.seatingCapacity > 0 && <li>Istekohti: {car.seatingCapacity}</li>}
                        {car.numberOfDoors > 0 && <li>Uste arv: {car.numberOfDoors}</li>}
                        {car.length > 0 && <li>Pikkus: {car.length} mm</li>}
                        {car.width > 0 && <li>Laius: {car.width} mm</li>}
                        {car.height > 0 && <li>Kõrgus: {car.height} mm</li>}
                    </ul>
                </div>
            ) : null}
            {(
                car.curbWeight ||
                car.grossWeight ||
                car.payloadCapacity ||
                car.brakedTrailerWeight ||
                car.unbrakedTrailerWeight ||
                car.wheelbase
            ) ? (
                <div className="spec-section p-4 border rounded-lg shadow-md bg-gray-50">
                    <h4 className="text-lg font-semibold mb-2">MASSID, MÕÕDUD</h4>
                    <ul className="space-y-2">
                        {car.curbWeight > 0 && <li>Tühimass: {car.curbWeight} kg</li>}
                        {car.grossWeight > 0 && <li>Täismass: {car.grossWeight} kg</li>}
                        {car.payloadCapacity > 0 && <li>Kandevõime: {car.payloadCapacity} kg</li>}
                        {car.brakedTrailerWeight > 0 && <li>Piduriga haagis: {car.brakedTrailerWeight} kg</li>}
                        {car.unbrakedTrailerWeight > 0 && <li>Pidurita haagis: {car.unbrakedTrailerWeight} kg</li>}
                        {car.wheelbase > 0 && <li>Teljevahe: {car.wheelbase} mm</li>}
                    </ul>
                </div>
            ) : null}

            {(
                car.engineCapacityLiters ||
                car.enginePowerHP ||
                car.topSpeed ||
                car.engineCapacityCubicCentimeters ||
                car.co2Emissions
            ) ? (
                <div className="spec-section p-4 border rounded-lg shadow-md bg-gray-50">
                    <h4 className="text-lg font-semibold mb-2">MOOTOR</h4>
                    <ul className="space-y-2">
                        {car.engineCapacityLiters > 0 && <li>Mootori maht: {car.engineCapacityLiters} l</li>}
                        {car.enginePowerHP > 0 && <li>Võimsus: {car.enginePowerHP} HP</li>}
                        {car.topSpeed > 0 && <li>Tippkiirus: {car.topSpeed} km/h</li>}
                        {car.engineCapacityCubicCentimeters > 0 && <li>Mootori maht: {car.engineCapacityCubicCentimeters} cm³</li>}
                        {car.co2Emissions > 0 && <li>CO2 (WLTP): {car.co2Emissions} g/km</li>}
                    </ul>
                </div>
            ) : null}
            {(
                car.fuelType ||
                car.fuelConsumptionCombined
            ) ? (
                <div className="spec-section p-4 border rounded-lg shadow-md bg-gray-50">
                    <h4 className="text-lg font-semibold mb-2">KÜTUS</h4>
                    <ul className="space-y-2">
                        {car.fuelType && <li>Kütus: {car.fuelType}</li>}
                        {car.fuelConsumptionCombined > 0 && (
                            <li>Kütusekulu (WLTP):
                                <ul className="space-y-1 pl-4">
                                    <li>- Keskmine: {car.fuelConsumptionCombined} l/100 km</li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            ) : null}

            {/* Teljed Section */}
            {car.numberOfAxles > 0 ? (
                <div className="spec-section p-4 border rounded-lg shadow-md bg-gray-50">
                    <h4 className="text-lg font-semibold mb-2">TELJED</h4>
                    <ul className="space-y-2">
                        <li>Sildade arv: {car.numberOfAxles}</li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default CarSpecs;
