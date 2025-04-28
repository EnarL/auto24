import "./globals.css";
import TopBar from "./components/common/Topbar";
import Header from "@/app/components/common/Header";
import AddListing from "@/app/components/common/AddListing";
import Foobar from "@/app/components/common/Foobar";
import React from "react";
import { AuthUserProvider } from "@/app/context/AuthUserContext";
import ClientOnlyLayout from "@/app/ClientOnlyLayout";
import AuthWrapper from "@/app/components/auth/AuthWrapper";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen bg-gray-100">
        <AuthUserProvider>
            <AuthWrapper>
                <ClientOnlyLayout>
                    <Header className="w-full hidden md:block" />

                    <div className="mx-auto flex flex-col w-full max-w-custom flex-grow">
                        <TopBar />
                        <div className="w-full md:w-[1000px]">
                            {children}
                        </div>
                    </div>
                    <Foobar />
                </ClientOnlyLayout>
            </AuthWrapper>
        </AuthUserProvider>
        </body>
        </html>
    );
}
