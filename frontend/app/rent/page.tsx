
import React from 'react';

const popularCarBrands = [
    'Audi',
    'BMW',
    'Mercedes-Benz',
    'Toyota',
    'Honda',
    'Ford',
    'Chevrolet',
    'Nissan',
    'Volkswagen',
    'Hyundai',
    'Kia',
    'Mazda',
    'Subaru',
    'Lexus',
    'Jaguar',
    'Porsche',
    'Ferrari',
    'Lamborghini',
    'Mitsubishi',
    'Peugeot'
];

const Vali: React.FC = () => {
    return (
        <div className="mt-8">
            <div className="border">
                <div className="grid grid-cols-4 gap-2">
                    {popularCarBrands.map((brand, index) => (
                        <div key={index} className="p-2 text-left">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Vali;