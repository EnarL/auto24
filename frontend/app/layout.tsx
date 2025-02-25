import type { Metadata } from "next";
import "./globals.css";
import TopBar from "./components/common/Topbar";
import Header from "./components/common/header";
import Kuuluta from "./components/common/kuuluta";
import Foobar from "./components/common/foobar";
import Logo from "./components/common/logo";
import Sublogos from "./components/common/sublogos";
import React from "react";
import Banner from "@/app/components/common/banner";
import FooterSection from "@/app/components/common/footersection";
import { AuthUserProvider } from "@/app/context/AuthUserContext";
import ClientOnlyLayout from "@/app/ClientOnlyLayout";
import AuthWrapper from "@/app/components/auth/AuthWrapper";

export const metadata: Metadata = {
    title: "Avaleht - auto24.ee",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="flex flex-col min-h-screen">
        <AuthUserProvider>
            <AuthWrapper>
                <ClientOnlyLayout>
                    <Header className="w-full hidden md:block" />
                    <div className="mx-auto flex flex-col w-full max-w-custom flex-grow">
                        <div>
                            <Banner className="hidden lg:block" />
                            <div className="flex items-center w-full">
                                <Logo className="flex-grow logo-details overall-margin-left mr-4" />
                                <Sublogos />
                            </div>
                            <TopBar />
                            <Kuuluta />
                            <div className="w-full md:w-[1000px]">
                                {children}
                            </div>
                        </div>
                    </div>
                    <Foobar />
                    <FooterSection />
                </ClientOnlyLayout>
            </AuthWrapper>
        </AuthUserProvider>
        </body>
        </html>
    );
}
