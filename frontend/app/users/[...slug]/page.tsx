"use client";

import { useParams } from "next/navigation";
import UserLayout from "@/app/components/user/UserLayout";
import React from "react";

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Use Next.js `NextPage` type to ensure it matches the expected structure
import { NextPage } from "next";

// UserPage component for handling dynamic user-related routes
const UserPage: NextPage = ({ children }: { children?: React.ReactNode }) => {
    const params = useParams();

    // Extracting the dynamic route part (slug) and determining the active tab
    const activeTab = params?.slug?.[0]
        ? capitalizeFirstLetter(params.slug[0].replace("-", " "))
        : "Default";  // Fallback to "Default" if no slug is found

    return <UserLayout activeTab={activeTab}>{children}</UserLayout>;
};

export default UserPage;
