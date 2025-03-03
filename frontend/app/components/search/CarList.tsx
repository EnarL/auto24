import CarItem from "./CarItem";

interface CarDetail {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
}

interface CarListProps {
    cars: CarDetail[];
    carImages: { [carId: string]: string[] };
    onCarClick: (carId: string) => void;
}

const CarList = ({ cars, carImages, onCarClick }: CarListProps) => {
    return (
        <div className="grid grid-cols-1 gap-2 w-full max-w-[740px]">
            {cars.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">Autosid pole saadaval.</div>
            ) : (
                cars.map((car) => (
                    <CarItem
                        key={car.id}
                        car={car}
                        image={carImages[car.id]?.[0]}
                        onClick={onCarClick}
                    />
                ))
            )}
        </div>
    );
};

export default CarList;
