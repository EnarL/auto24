import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const useCarFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        make: "",
        model: "",
        priceFrom: "",
        priceTo: "",
        yearFrom: "",
        yearTo: "",
        powerFrom: "",
        powerTo: "",
        mileageFrom: "",
        mileageTo: "",
        fuelType: "",
        driveType: "",
        transmission: "",
        locationCountry: "",
        color: "",
    });

    const [carCount, setCarCount] = useState<number>(0);

    useEffect(() => {
        const newFilters: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            if (key === "firstRegistrationDate") {
                const [yearFrom, yearTo] = value.split("-");
                newFilters.yearFrom = yearFrom;
                newFilters.yearTo = yearTo;
            } else if (key === "price") {
                const [priceFrom, priceTo] = value.split("-");
                newFilters.priceFrom = priceFrom;
                newFilters.priceTo = priceTo;
            } else {
                newFilters[key] = value;
            }
        });
        setFilters((prev) => ({ ...prev, ...newFilters }));
        fetchCarCount();
    }, [searchParams]);

    const fetchCarCount = async () => {
        try {
            const response = await fetch("http://localhost:8080/cars/count");
            if (response.ok) {
                const data = await response.json();
                setCarCount(data);
            } else {
                console.error("Failed to fetch car count");
            }
        } catch (error) {
            console.error("Error fetching car count:", error);
        }
    };

    const handleSearch = () => {
        const queryParams = new URLSearchParams(
            Object.entries(filters)
                .filter(([, value]) => value.trim() !== "")
                .reduce((acc, [key, value]) => {
                    if (key === "yearFrom" || key === "yearTo") {
                        acc.firstRegistrationDate = `${filters.yearFrom}-${filters.yearTo}`;
                    } else {
                        acc[key] = value;
                    }
                    return acc;
                }, {} as Record<string, string>)
        ).toString();

        if (queryParams) {
            router.push(`search/cars?${queryParams}`);
        }
    };

    return { filters, setFilters, carCount, handleSearch };
};

export default useCarFilters;