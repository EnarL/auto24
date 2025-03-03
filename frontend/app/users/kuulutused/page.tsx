"use client";
import React from "react";
import UserLayout from "@/app/components/user/UserLayout";
import useCarPreviewForUser from "@/app/hooks/useCarPreviewForUser";
import CarGrid from "@/app/components/common/CarGrid";
import Link from "next/link";

const KuulutusedPage: React.FC = () => {
    const { cars, carImages, loading, error } = useCarPreviewForUser();

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
                        columns={{ sm:2, md: 3, lg: 3 }}
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

export default KuulutusedPage;
