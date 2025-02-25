"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExtendedMenuBar from "@/app/components/common/ExtendedMenuBar";
import CarList from "@/app/components/CarList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SortSelect from "@/app/components/SortSelect";
import { faSlidersH, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface CarDetail {
    id: string;
    title: string;
    price: number;
    firstRegistrationDate: string;
}

interface CarImage {
    [carId: string]: string[];
}

const BrandPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [carDetails, setCarDetails] = useState<CarDetail[]>([]);
    const [carImages, setCarImages] = useState<CarImage>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const carsPerPage = 10;

    const fetchCarDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams(searchParams.toString());
            const response = await fetch(`http://localhost:8080/car-details/search?${queryParams.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch car details");
            }
            const data: CarDetail[] = await response.json();
            setCarDetails(data);
            const imageRequests = data.map((car) =>
                fetch(`http://localhost:8080/productImages/getCarImages/${car.id}`)
                    .then((res) => (res.ok ? res.json() : []))
                    .catch(() => [])
            );

            const imageResults = await Promise.all(imageRequests);
            const newCarImages: CarImage = {};
            data.forEach((car, index) => {
                newCarImages[car.id] = imageResults[index];
            });

            setCarImages(newCarImages);
        } catch (error) {
            setError("An error occurred while fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCarDetails();
    }, [searchParams]);

    const sortedCars = [...carDetails].sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "year-asc")
            return new Date(b.firstRegistrationDate).getTime() - new Date(a.firstRegistrationDate).getTime();
        if (sortOption === "year-desc")
            return new Date(a.firstRegistrationDate).getTime() - new Date(b.firstRegistrationDate).getTime();
        return 0;
    });

    const handleCarClick = (carId: string) => {
        router.push(`/cars/${carId}`);
    };
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > Math.ceil(carDetails.length / carsPerPage)) return;
        setCurrentPage(newPage);
    };
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };
    const paginatedCars = sortedCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);
    return (
        <div className="mt-2 flex overflow-x-hidden">
            <ExtendedMenuBar showCarCount={true} isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
            <main className="flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                    <button
                        className="border border-gray-500 px-2 py-1 mt-2 ml-4 flex items-center md:hidden"
                        onClick={toggleMenu}
                    ><FontAwesomeIcon icon={faSlidersH} className="h-5 w-5 mr-1 text-gray-500"/>
                        Filtrid
                    </button>
                </div>
                <div className="flex items-center justify-between w-full px-4 mt-2 bg-gray-200 py-2">
                    <span className="text-lg font-semibold">Kokku: {carDetails.length}</span>
                    <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
                    <div className="flex items-center">
                        <button
                            className="p-2 border border-gray-500 rounded-md mx-1"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        <span className="px-3">{currentPage} / {Math.ceil(carDetails.length / carsPerPage)}</span>

                        <button
                            className="p-2 border border-gray-500 rounded-md mx-1"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === Math.ceil(carDetails.length / carsPerPage)}
                        ><FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
                <div className="w-full px-4 mt-2">
                    {loading && <div>Loading...</div>}
                    {error && <div className="text-red-500">Error: {error}</div>}
                    <CarList cars={paginatedCars} carImages={carImages} onCarClick={handleCarClick}/>
                </div>
            </main>
        </div>
    );
};

export default BrandPage;