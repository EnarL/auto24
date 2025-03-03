import { Dispatch, SetStateAction } from "react";

interface CarPreview {
    id: string;
    title: string;
    expirationDate: string;
    isActive: boolean;
}

interface CarActions {
    handleToggleActive: (id: string) => Promise<void>;
    handleDeleteCar: (id: string) => Promise<void>;
    handleEditCar: (carId: string) => void;
}

export const useCarActions = (
    userCars: CarPreview[],
    setUserCars: Dispatch<SetStateAction<CarPreview[]>>
): CarActions => {
    const handleToggleActive = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/cars/activate/${id}`, {
                method: "PATCH",
                credentials: "include",
            });

            if (response.ok) {
                alert(await response.text());
                setUserCars((prevCars) =>
                    prevCars.map((car) =>
                        car.id === id ? { ...car, isActive: !car.isActive } : car
                    )
                );
            } else {
                alert(`Failed to update listing status: ${await response.text()}`);
            }
        } catch (error) {
            console.error("Error updating car status:", error);
            alert("Error updating listing status");
        }
    };

    const handleDeleteCar = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this car sale?")) {
            try {
                const response = await fetch(`http://localhost:8080/cars/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                });

                if (response.ok) {
                    setUserCars((prevCars) => prevCars.filter((car) => car.id !== id));
                    alert("Car sale deleted successfully");
                } else {
                    alert("Failed to delete the car sale");
                }
            } catch (error) {
                console.error("Error deleting car:", error);
                alert("Error deleting car sale");
            }
        }
    };

    const handleEditCar = (carId: string) => {
        window.location.href = `/users/edit/${carId}`;
    };

    return { handleToggleActive, handleDeleteCar, handleEditCar };
};

export default useCarActions;
