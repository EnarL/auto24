"use client";
import React from "react";
import Menubar from "./components/common/Menubar";
import Popularbrands from "@/app/components/homepage/Popularbrands";
import Listings from "@/app/components/homepage/Listings";

const Page: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <main className="bg-white shadow-lg rounded-lg p-8 md:p-12 w-full">
                <div className="space-y-8 text-center">
                        <Menubar showCarCount={true} />
                        <Popularbrands />
                </div>
                <div className="pt-12">
                    <Listings carCount={30} columns={{ sm: 2, md: 4, lg: 6 }} />
                </div>
            </main>
        </div>
    );
};

export default Page;