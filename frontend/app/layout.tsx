import "./globals.css";
import TopBar from "./components/common/Topbar";
import Header from "@/app/components/common/Header";
import Foobar from "@/app/components/common/Foobar";
import React from "react";
import { AuthUserProvider } from "@/app/context/AuthUserContext";
import ClientOnlyLayout from "@/app/ClientOnlyLayout";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            {/* Preconnect to S3 bucket for faster image loading */}
            <link rel="preconnect" href="https://carscarscars24.s3.eu-north-1.amazonaws.com" />
            <link rel="dns-prefetch" href="https://carscarscars24.s3.eu-north-1.amazonaws.com" />
            <title>cars</title>
        </head>
        <body className="flex flex-col min-h-screen bg-gray-100">
        <AuthUserProvider>
            <ClientOnlyLayout>
                <Header className="w-full hidden md:block" />
                <div className="mx-auto flex flex-col w-full max-w-custom flex-grow">
                    <TopBar />
                    <div className="w-full md:w-[1200px]">
                        {children}
                    </div>
                </div>
                <Foobar />
            </ClientOnlyLayout>
        </AuthUserProvider>
        </body>
        </html>
    );
}