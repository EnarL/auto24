"use client";
import React from "react";
import UserLayout from "@/app/components/UserLayout"; // Using UserLayout
import useCarPreviewForUser from "@/app/hooks/useCarPreviewForUser"; // Hook for user preview
import CarGrid from "@/app/components/CarGrid"; // Unified CarGrid component
import Link from "next/link";

const KuulutusedPage: React.FC = () => {
    const { cars, carImages, loading, error } = useCarPreviewForUser(); // Fetch user cars

    return (
        <UserLayout activeTab="Sõidukite kuulutused">
            {cars.length === 0 ? (
                <div className="border-l-4 border-[#91d5ff] mt-4 ml-[10px] w-[740px] text-[#06c] mx-auto p-3 bg-[#f2faff] text-[14px] flex items-center">
                    <img src="https://www.auto24.ee/images/icons/msg/info.svg" alt="Info" className="mr-2" />
                    <span>Teil ei ole praegu sisestatud ühtegi kuulutust. </span>
                    <Link href="#" className="underline ml-1">Sisesta kuulutus</Link>
                </div>
            ) : (
                <div className="mt-4 ml-2">
                    <CarGrid
                        columns={3}
                        carCount={30}
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

export default KuulutusedPage;
