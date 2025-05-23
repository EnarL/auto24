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
            className="flex border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
            onClick={() => onClick(car.id)}
        >
            <div className="w-1/4 bg-gray-100">
                {image ? (
                    <S3Image
                        src={image}
                        alt={`Car ${car.title}`}
                        className="w-full h-32 object-cover"
                    />
                ) : (
                    <div className="w-full h-24 flex items-center justify-center bg-gray-200 text-gray-500 text-sm">
                        Pilte ei ole saadaval
                    </div>
                )}
            </div>
            <div className="flex flex-col p-4 flex-grow w-2/3">
                <div className="font-bold text-lg text-gray-800">{car.title}</div>
                <div className="text-gray-600 text-sm">{car.price} EUR</div>
                <div className="text-gray-500 text-xs">{car.firstRegistrationDate}</div>
            </div>
        </div>
    );
};

export default CarItem;