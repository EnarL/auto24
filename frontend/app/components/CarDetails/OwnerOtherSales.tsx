import React from "react";
import useOwnerOtherSales from "@/app/hooks/useOwnerOtherSales";
import Link from "next/link";
import S3Image from "@/app/components/common/S3Image";

interface Props {
    carId: string;
}

const OwnerOtherSales: React.FC<Props> = ({ carId }) => {
    const { cars, carImages, loading, error } = useOwnerOtherSales(carId);

    if (loading) return <p>Loading owner's other cars...</p>;
    if (error) return <p>Error: {error}</p>;

    const displayedCars = cars.slice(0, 4);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {displayedCars.map((car) => (
                <div key={car.id} className="border p-2 rounded-lg shadow-sm flex flex-col">
                    {carImages[car.id] && carImages[car.id].length > 0 && (
                        <S3Image
                            src={carImages[car.id][0]}
                            alt={car.title}
                            className="rounded-md mx-auto mb-2"
                        />
                    )}
                    <div className="flex-grow">
                        <h3 className="text-sm font-semibold">{car.title}</h3>
                        <p className="text-sm text-gray-600">{car.price} €</p>
                        <p className="text-sm text-gray-600">{car.firstRegistrationDate}</p>
                    </div>
                    <Link
                        href={`/cars/${car.id}`}
                        className="text-blue-500 text-xs mt-2 inline-block"
                    >
                        Vaata lähemalt
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default OwnerOtherSales;
