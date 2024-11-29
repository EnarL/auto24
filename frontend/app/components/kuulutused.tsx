import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const carImages = [
    '/path/to/car7.jpg',
    '/path/to/car9.jpg','/path/to/car1.jpg',
    '/path/to/car2.jpg', '/path/to/car1.jpg',
    '/path/to/car2.jpg','/path/to/car1.jpg',
    '/path/to/car2.jpg', '/path/to/car1.jpg',
    '/path/to/car2.jpg','/path/to/car1.jpg',
    '/path/to/car2.jpg', '/path/to/car1.jpg',
    '/path/to/car2.jpg','/path/to/car1.jpg',
    '/path/to/car2.jpg', '/path/to/car1.jpg',
    '/path/to/car2.jpg','/path/to/car1.jpg',
    '/path/to/car2.jpg', '/path/to/car1.jpg',
    '/path/to/car2.jpg','/path/to/car1.jpg',
    '/path/to/car2.jpg', '/path/to/car1.jpg',
    '/path/to/car2.jpg','/path/to/car1.jpg',
    '/path/to/car2.jpg', '/path/to/car1.jpg',
    '/path/to/car2.jpg'
    // Add more image paths here
];

const CarGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-6 gap-4 p-4">
            {carImages.map((src, index) => (
                <Link href={`/car/${index}`} key={index}>

                        <Image src={src} alt={`Car ${index + 1}`} width={200} height={150} className="object-cover w-full h-full" />

                </Link>
            ))}
        </div>
    );
};

export default CarGrid;