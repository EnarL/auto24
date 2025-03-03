import { useEffect, useState } from "react";
import { useAuthUser } from "@/app/context/AuthUserContext";

interface CarPreview {
    id: string;
    title: string;
    expirationDate: string;
    isActive: boolean;
}

export const useUserCars = () => {
    const { isLoggedIn, username } = useAuthUser();
    const [userCars, setUserCars] = useState<CarPreview[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserCars = async () => {
            if (isLoggedIn && username) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/car-details/users`, {
                        method: "GET",
                        credentials: "include",
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserCars(data.filter((car: CarPreview) => car && car.title));
                    } else {
                        console.error("Failed to fetch car previews");
                    }
                } catch (error) {
                    console.error("Error fetching user car previews:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (isLoggedIn) fetchUserCars();
    }, [isLoggedIn, username]);

    return { userCars, setUserCars, loading };
};

export default useUserCars;
