import React from 'react';
import { useRouter } from "next/navigation";

const Popularbrands: React.FC = () => {
    const router = useRouter();

    const handleBrandClick = (brand: string) => {
        router.push(`search/cars?make=${brand}`);
    };

    const carBrands = [
        'Audi', 'BMW', 'Citroen', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Mercedes-Benz'
    ];

    const brandLogos: Record<string, string> = {
        Audi: '/logos/audi.svg',
        BMW: '/logos/bmw.svg',
        Citroen: '/logos/citroen.svg',
        Ford: '/logos/ford.svg',
        Honda: '/logos/honda.svg',
        Hyundai: '/logos/hyundai.svg',
        Kia: '/logos/kia.svg',
        'Mercedes-Benz': '/logos/mercedes-benz.svg',
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-6 text-gray-800">POPULAARSED MARGID</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {carBrands.map((brand) => (
                    <div
                        key={brand}
                        onClick={() => handleBrandClick(brand)}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 overflow-hidden">
                            <img
                                src={brandLogos[brand]}
                                alt={`${brand} logo`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <p className="text-gray-800 font-medium">{brand}</p>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => router.push('/vali')}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition duration-300"
                >
                    Vaata Kõiki
                </button>
            </div>
        </div>
    );
};

export default Popularbrands;