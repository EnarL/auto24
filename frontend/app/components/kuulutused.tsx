import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import S3Image from "@/app/components/S3Image";

interface CarGridProps {
    columns: number;
    rows: number;
    carCount: number;
}

const CarGrid: React.FC<CarGridProps> = ({ columns, rows, carCount }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const fetchImageUrl = async () => {
            const response = await fetch('http://localhost:8080/productImages/download/Volvo X40.jpg');
            if (response.ok) {
                const url = await response.text();
                setImageUrl(url);
            } else {
                console.error('Failed to fetch image');
            }
        };

        fetchImageUrl().then(r => {});
    }, []);

    return (
        <>
            <h1 className="text-1xl font-extralight font-thin opacity-65">VALIK KUULUTUSI</h1>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {Array(carCount).fill(imageUrl).map((src, index) => (
                    <Link href={`/cars/${index}`} key={index}>
                        <div className="flex flex-col border-2 border-gray-100">
                            {src && <S3Image src={src} alt={`Car ${index + 1}`} className="" />}
                            <div className="border-2 border-gray-100">
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