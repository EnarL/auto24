// app/BrandPage.tsx

"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MenuBar from "@/app/components/common/menubar";
import CarList from "@/app/components/CarList";
import Pagination from "@/app/components/Pagination";
import SortSelect from "@/app/components/SortSelect";

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
    const make = searchParams.get("make") || "";

    const fetchCarDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams(searchParams.toString());
            const response = await fetch(`http://localhost:8080/car-details/search?${queryParams.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Failed to fetch car details");
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

    const handleCarClick = (carId: string) => {
        router.push(`/cars/${carId}`);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > Math.ceil(carDetails.length / carsPerPage)) return;
        setCurrentPage(newPage);
    };

    const paginatedCars = sortedCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

    return (
        <div className="flex gap-[10px]">
            <div className="w-[250px]">
                <MenuBar showCarCount />
            </div>
            <div className="flex-grow">
                <div className="mt-2 flex justify-between items-center">
                    <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
                    <div>
                        <span className="mr-4">Kokku: {carDetails.length}</span>
                        <Pagination
                            currentPage={currentPage}
                            totalCars={carDetails.length}
                            onPageChange={handlePageChange}
                            carsPerPage={carsPerPage}
                        />
                    </div>
                </div>
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500">Error: {error}</div>}
                <CarList cars={paginatedCars} carImages={carImages} onCarClick={handleCarClick} />
            </div>
        </div>
    );
};

export default BrandPage;
