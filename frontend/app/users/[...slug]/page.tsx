"use client";

import { useParams } from "next/navigation";
import UserLayout from "@/app/components/UserLayout";

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const UserPage = ({ children }: { children: React.ReactNode }) => {
    const params = useParams();
    const activeTab = params?.slug?.[0]
        ? capitalizeFirstLetter(params.slug[0].replace("-", " "))
        : "Default";

    console.log(activeTab);

    return <UserLayout activeTab={activeTab}>{children}</UserLayout>;
};

export default UserPage;
