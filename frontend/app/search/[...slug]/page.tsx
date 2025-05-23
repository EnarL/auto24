"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ExtendedMenuBar from "@/app/components/common/ExtendedMenuBar";
import CarList from "@/app/components/search/CarList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SortSelect from "@/app/components/search/SortSelect";
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

    // State variables
    const [carDetails, setCarDetails] = useState<CarDetail[]>([]);
    const [carImages, setCarImages] = useState<CarImage>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [sortOption, setSortOption] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const carsPerPage = 10;

    // Fetch car details and images
    useEffect(() => {
        const fetchCarData = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams(searchParams.toString());
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/car-details/search?${queryParams}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error("Failed to fetch car details");

                const data: CarDetail[] = await response.json();
                setCarDetails(data);

                const imageRequests = data.map((car) =>
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/productImages/getCarImages/${car.id}`)
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
                console.error("Error fetching car data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarData();
    }, [searchParams]);

    // Sorting logic
    const sortedCars = [...carDetails].sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "year-asc")
            return new Date(b.firstRegistrationDate).getTime() - new Date(a.firstRegistrationDate).getTime();
        if (sortOption === "year-desc")
            return new Date(a.firstRegistrationDate).getTime() - new Date(b.firstRegistrationDate).getTime();
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(carDetails.length / carsPerPage);
    const paginatedCars = sortedCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

    const handleCarClick = (carId: string) => router.push(`/cars/${carId}`);
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };
    const toggleMenu = () => setIsMenuVisible((prev) => !prev);

    // Pagination controls component
    const PaginationControls = () => (
        <div className="flex items-center">
            <button
                className="p-2 border border-gray-500 rounded-md mx-1"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="px-3">{currentPage} / {totalPages}</span>
            <button
                className="p-2 border border-gray-500 rounded-md mx-1"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );

    return (
        <div className="mt-2 flex overflow-x-hidden">
            <ExtendedMenuBar showCarCount={true} isMenuVisible={isMenuVisible} toggleMenu={toggleMenu} />
            <main className="flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                    <button
                        className="border border-gray-500 px-2 py-1 mt-2 ml-4 flex items-center md:hidden"
                        onClick={toggleMenu}
                    >
                        <FontAwesomeIcon icon={faSlidersH} className="h-5 w-5 mr-1 text-gray-500" />
                        Filtrid
                    </button>
                </div>
                <div className="rounded-md flex items-center justify-between w-full px-4 bg-gray-200 py-2.5">
                    <span className="text-lg font-semibold">Kokku: {carDetails.length}</span>
                    <div className="flex items-center gap-x-4">
                        <SortSelect sortOption={sortOption} onSortChange={setSortOption}/>
                        {carDetails.length > 0 && <PaginationControls/>}
                    </div>
                </div>
                <div className="w-full mt-2">
                    {loading ? <div>Loading...</div> :
                        <CarList cars={paginatedCars} carImages={carImages} onCarClick={handleCarClick}/>}
                </div>
            </main>
        </div>
    );
};

export default BrandPage;