"use client"
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import useCarPreviewForUser from '../../hooks/useCarPreviewForUser'; // Hook for user preview
import CarGrid from '../../components/CarGrid'; // Import the unified CarGrid component

const MinuPage: React.FC = () => {
    const { cars, carImages, loading, error } = useCarPreviewForUser(); // Fetch user cars

    return (
        <div className="flex flex-col">
            <div className="flex">
                <Sidebar activeSection="Sõidukite kuulutused" />
                <div className="flex flex-col">
                    <Tabs activeTab="Sõidukite kuulutused" />
                    {cars.length === 0 ? (
                        <div
                            className="border-l-4 border-[#91d5ff] mt-4 ml-[10px] w-[740px] text-[#06c] mx-auto p-3 inline bg-[#f2faff] text-[14px] flex items-center">
                            <img src="https://www.auto24.ee/images/icons/msg/info.svg" alt="Info" className="mr-2"/>
                            <span>Teil ei ole praegu sisestatud ühtegi kuulutust. </span>
                            <a href="#" className="underline ml-1">Sisesta kuulutus</a>
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

                </div>
            </div>
        </div>
    );
};

export default MinuPage;
