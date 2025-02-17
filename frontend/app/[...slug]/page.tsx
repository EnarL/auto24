"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuBar from "@/app/components/menubar";
import S3Image from "@/app/components/S3Image";

interface CarDetail {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
    imageKeys?: string[];
}

interface CarImage {
    [carId: string]: string[];
}

const BrandPage = () => {
    const { slug } = useParams();
    const slugString = Array.isArray(slug) ? slug[0] : slug;
    const decodedSlug = slugString ? decodeURIComponent(slugString) : '';

    const [carDetails, setCarDetails] = useState<CarDetail[]>([]);
    const [carImages, setCarImages] = useState<CarImage>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>('järjesta');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchParams, setSearchParams] = useState<any>({});
    const carsPerPage = 10;
    const router = useRouter();

    const fetchCarDetails = async (params: any) => {
        setLoading(true);
        setError(null);
        setSearchParams(params);

        try {
            const queryParams = new URLSearchParams({
                make: decodedSlug || "",
                ...params,
            }).toString();

            const response = await fetch(`http://localhost:8080/car-details/search?${queryParams}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error("Failed to fetch car details");

            const data: CarDetail[] = await response.json();
            setCarDetails(data);

            // Fetch images concurrently
            const imageRequests = data.map(car =>
                fetch(`http://localhost:8080/productImages/getCarImages/${car.id}`)
                    .then(res => res.ok ? res.json() : [])
                    .catch(() => [])
            );

            const imageResults = await Promise.all(imageRequests);
            const newCarImages: CarImage = {};
            data.forEach((car, index) => {
                newCarImages[car.id] = imageResults[index];
            });

            setCarImages(newCarImages);
        } catch (error) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (decodedSlug) fetchCarDetails({});
    }, [decodedSlug]);

    useEffect(() => {
        if (carDetails.length === 0) return;

        let sortedCars = [...carDetails];
        switch (sortOption) {
            case 'price-asc':
                sortedCars.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedCars.sort((a, b) => b.price - a.price);
                break;
            case 'year-asc':
                sortedCars.sort((a, b) =>
                    new Date(a.firstRegistrationDate).getTime() - new Date(b.firstRegistrationDate).getTime()
                );
                break;
            case 'year-desc':
                sortedCars.sort((a, b) =>
                    new Date(b.firstRegistrationDate).getTime() - new Date(a.firstRegistrationDate).getTime()
                );
                break;
        }
        setCarDetails([...sortedCars]);
    }, [sortOption]);

    const handleCarClick = (carId: string) => {
        router.push(`/cars/${carId}`);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > Math.ceil(carDetails.length / carsPerPage)) return;
        setCurrentPage(newPage);
    };

    const paginatedCars = carDetails.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="flex">
            <div className="w-[250px]">
                <MenuBar onSearch={fetchCarDetails} />
            </div>
            <div className="flex-grow">
                <div className="mt-4 ml-2 flex justify-between items-center">
                    <div>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="mb-4 p-1 border border-gray-300"
                        >
                            <option value="järjesta">Järjesta</option>
                            <option value="price-asc">Hind kasvav</option>
                            <option value="price-desc">Hind kahanev</option>
                            <option value="year-asc">Uuemad eespool</option>
                            <option value="year-desc">Vanemad eespool</option>
                        </select>
                    </div>
                    <div>
                        <span className="mr-4">Kokku: {carDetails.length}</span>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="mr-2 p-1 border border-gray-300 disabled:opacity-50"
                        >
                            Eelmine
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage * carsPerPage >= carDetails.length}
                            className="p-1 border border-gray-300 disabled:opacity-50"
                        >
                            Järgmine
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 w-full max-w-[1000px]">
                    {paginatedCars.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg">No cars available for this brand/make.</div>
                    ) : (
                        paginatedCars.map((car) => (
                            <div
                                key={car.id}
                                className="flex border-2 border-gray-100 h-full cursor-pointer"
                                onClick={() => handleCarClick(car.id)}
                            >
                                <div className="w-1/4">
                                    {carImages[car.id]?.length > 0 ? (
                                        <S3Image
                                            src={carImages[car.id][0]}
                                            alt={`Car ${car.title} - Image 1`}
                                            className="w-full h-24"
                                        />
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                                <div className="flex flex-col p-2 flex-grow w-3/4">
                                    <div className="font-bold">{car.title}</div>
                                    <div>{car.price} EUR</div>
                                    <div>{car.firstRegistrationDate}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
