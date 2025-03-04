import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['carscarscars24.s3.eu-north-1.amazonaws.com'],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
};

export default nextConfig;
