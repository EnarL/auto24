import S3Image from "@/app/components/common/S3Image";

interface CarDetail {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
}

interface CarItemProps {
    car: CarDetail;
    image?: string;
    onClick: (carId: string) => void;
}

const CarItem = ({ car, image, onClick }: CarItemProps) => {
    return (
        <div
            className="flex border-2 border-gray-100 h-full cursor-pointer"
            onClick={() => onClick(car.id)}
        >
            <div className="w-1/4">
                {image ? (
                    <S3Image
                        src={image}
                        alt={`Car ${car.title}`}
                        className="w-full h-24"
                    />
                ) : (
                    <p>Pilte ei ole saadaval</p>
                )}
            </div>
            <div className="flex flex-col p-2 flex-grow w-3/4">
                <div className="font-bold">{car.title}</div>
                <div>{car.price} EUR</div>
                <div>{car.firstRegistrationDate}</div>
            </div>
        </div>
    );
};

export default CarItem;
