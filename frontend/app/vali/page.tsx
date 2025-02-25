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
    const columns = 7;
    const rows = Math.ceil(popularCarBrands.length / columns);
    const brandColumns = Array.from({ length: columns }, (_, i) =>
        popularCarBrands.slice(i * rows, i * rows + rows)
    );

    return (
        <div className="">
            <h1 className="text-[24px] pt-2">MARGID</h1>
            <div className="border mt-2">
                <div className="grid md:grid-cols-7 grid-cols-3 dp-1">
                    {brandColumns.map((column, colIndex) => (
                        <div key={colIndex} className="p-1 text-left">
                            {column.map((brand, index) => (
                                <Link key={index} href={`search/cars?make=${brand}`}>
                                    <div className="p-1 cursor-pointer hover:text-blue-500">
                                        {brand}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Vali;
