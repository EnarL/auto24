"use client";
import React from "react";
import UserLayout from "@/app/components/user/UserLayout";
import useCarPreviewForUser from "@/app/hooks/useCarPreviewForUser";
import CarGrid from "@/app/components/common/CarGrid";
import NoListingsMessage from "@/app/components/user/NoListingsMessage";

const ListingsPage: React.FC = () => {
    const { cars, carImages, loading, error } = useCarPreviewForUser();

    return (
        <UserLayout activeTab="Sõidukite kuulutused">
            {cars.length === 0 ? (
                <NoListingsMessage />
            ) : (
                <div className="mt-4 ml-2">
                    <CarGrid
                        columns={{ sm: 2, md: 3, lg: 3 }}
                        carCount={6}
                        cars={cars}
                        carImages={carImages}
                        loading={loading}
                        error={error}
                    />
                </div>
            )}
        </UserLayout>
    );
};

export default ListingsPage;