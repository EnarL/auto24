"use client"
import React from "react";
import { useParams } from "next/navigation";
import useCarDetails from "@/app/hooks/useCarDetails";
import CarInfo from "@/app/components/CarDetails/CarInfo";
import CarImages from "@/app/components/CarDetails/CarImages";
import CarExtraInfo from "@/app/components/CarDetails/CarExtraInfo";
import CarSpecs from "@/app/components/CarDetails/CarSpecs";

const CarDetails: React.FC = () => {
    const { slug } = useParams(); // Get the slug from URL params
    if (typeof slug !== "string") {
        return <p>Invalid car slug or car not found</p>; // Handle slug validation
    }

    const { car, carExtraInfo, images, isLoading } = useCarDetails(slug);

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
                <CarInfo car={car}/>

                <CarImages images={images} car={car}/>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">VARUSTUS</p>
            </div>

            <CarExtraInfo carExtraInfo={carExtraInfo}/>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">TEHNILISED NÄITAJAD</p>
            </div>
            <CarSpecs car={car}/>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">MUU INFORMATSIOON</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">MÜÜJA</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">KÜSIMUSED MÜÜJALE</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">SÕIDUKI OSTU FINANTSEERIMINE</p>
            </div>
            <div className="pt-10">
                <p className="bg-gray-100 font-semibold p-2">VAATA MÜÜJA TEISI PAKKUMISI</p>
            </div>
        </div>
    );
};

export default CarDetails;
