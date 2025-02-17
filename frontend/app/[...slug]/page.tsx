"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
    const searchParams = useSearchParams(); // Get the search params directly from the URL
    const router = useRouter();

    const [carDetails, setCarDetails] = useState<CarDetail[]>([]);
    const [carImages, setCarImages] = useState<CarImage>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>(""); // Sort options
    const [currentPage, setCurrentPage] = useState<number>(1);
    const carsPerPage = 10;

    // Extract the 'make' parameter from the URL
    const make = searchParams.get("make") || "";

    const fetchCarDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams(searchParams.toString()); // Convert the search params to a query string
            console.log("Fetching cars with query:", queryParams.toString());

            const response = await fetch(`http://localhost:8080/car-details/search?${queryParams.toString()}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Failed to fetch car details");

            const data: CarDetail[] = await response.json();
            console.log("Fetched cars:", data);

            setCarDetails(data);

            // Fetch images concurrently
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
            console.error("Error fetching cars:", error);
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
            return new Date(a.firstRegistrationDate).getTime() - new Date(b.firstRegistrationDate).getTime();
        if (sortOption === "year-desc")
            return new Date(b.firstRegistrationDate).getTime() - new Date(a.firstRegistrationDate).getTime();
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="flex gap-[10px]">
            <div className="w-[250px]">
                <MenuBar /> {/* Pass the selected make to MenuBar */}
            </div>
            <div className="flex-grow">
                <div className="mt-2 flex justify-between items-center">
                    <div>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="mb-4 p-1 border border-gray-300"
                        >
                            <option value="">Järjesta</option>
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
                <div className="grid grid-cols-1 gap-2 w-full max-w-[740px]">
                    {paginatedCars.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg">No cars available.</div>
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
                                            alt={`Car ${car.title}`}
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
