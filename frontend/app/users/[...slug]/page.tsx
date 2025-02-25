"use client";

import { useParams } from "next/navigation";
import UserLayout from "@/app/components/user/UserLayout";

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const UserPage = ({ children }: { children: React.ReactNode }) => {
    const params = useParams();
    const activeTab = params?.slug?.[0]
        ? capitalizeFirstLetter(params.slug[0].replace("-", " "))
        : "Default";
    return <UserLayout activeTab={activeTab}>{children}</UserLayout>;
};

export default UserPage;
