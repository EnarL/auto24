import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import S3Image from "@/app/components/S3Image";

const CarGrid: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            const response = await fetch('http://localhost:8080/productImages/download/Volvo X40.jpg');
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
            } else {
                console.error('Failed to fetch image');
            }
        };

        fetchImageUrl();
    }, []);

    return (
        <>
            <h1 className="text-1xl font-extralight font-thin opacity-65">VALIK KUULUTUSI</h1>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 grid-cols-2-custom">
                {Array(30).fill(imageUrl).map((src, index) => (
                    <Link href={`/cars/${index}`} key={index}>
                        <div className="flex flex-col border-2 border-gray-100">
                            {src && <S3Image src={src} alt={`Car ${index + 1}`} className="w-full h-auto" />}
                            <div className="border-2 border-gray-100 p-2">
                                <div>Audi</div>
                                <div>99999EUR</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default CarGrid;