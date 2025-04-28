import React from 'react';
import Link from 'next/link';

const popularCarBrands = [
    'Abarth', 'Acura', 'Aiways', 'Alfa Romeo', 'Alpina', 'Alpine', 'Aston Martin', 'Audi', 'BMW', 'BYD', 'Bentley',
    'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroen', 'Cupra', 'DS', 'Dacia', 'Daewoo', 'Daihatsu', 'Dodge',
    'Ferrari', 'Fiat', 'Fisker', 'Ford', 'GAZ', 'GMC', 'GWM', 'Honda', 'Hummer', 'Hyundai', 'IZ', 'Infiniti', 'Isuzu',
    'Jaguar', 'Jeep', 'Kia', 'Kombat', 'LUAZ', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lincoln',
    'Lynk & Co', 'MINI', 'Maserati', 'Maxus', 'Mazda', 'McLaren', 'Mercedes-AMG', 'Mercedes-Benz', 'Mitsubishi',
    'Moskvich', 'Nissan', 'Opel', 'Peugeot', 'Plymouth', 'Polaris', 'Polestar', 'Pontiac', 'Porsche', 'Ram', 'Renault',
    'Rivian', 'Rolls-Royce', 'Rover', 'SEAT', 'SWM', 'Saab', 'Seres', 'Skoda', 'Skywell', 'Smart', 'SsangYong', 'Subaru',
    'Suzuki', 'Tesla', 'Toyota', 'UAZ', 'VAZ', 'Volkswagen', 'Volvo', 'ZAZ'
];

const Vali: React.FC = () => {
    // Group brands by their first letter
    const groupedBrands = popularCarBrands.reduce((acc, brand) => {
        const firstLetter = brand[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [];
        acc[firstLetter].push(brand);
        return acc;
    }, {} as Record<string, string[]>);
    const alphabet = Object.keys(groupedBrands).sort();

    return (
        <div className="p-6 bg-gray-50 border-2 h-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">MARGID</h1>
            <div className="flex flex-wrap gap-3 mb-8">
                {alphabet.map((letter) => (
                    <a
                        key={letter}
                        href={`#${letter}`}
                        className="px-4 py-2 bg-gray-100 text-black font-medium rounded-lg shadow-sm hover:font-semibold hover:scale-105 transition duration-300"
                    >
                        {letter}
                    </a>
                ))}
            </div>

            <div className="border rounded-lg bg-white shadow-md p-6">
                {alphabet.map((letter) => (
                    <div key={letter} id={letter} className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{letter}</h2>
                        <div className="grid md:grid-cols-6 grid-cols-3 gap-4">
                            {groupedBrands[letter].map((brand) => (
                                <Link key={brand} href={`search/cars?make=${brand}`}>
                                    <div className="p-2 text-center bg-gray-100 rounded-lg shadow-sm hover:scale-105 transition duration-300 cursor-pointer">
                                        {brand}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vali;