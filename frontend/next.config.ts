import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['carscarscars24.s3.eu-north-1.amazonaws.com'],
        unoptimized: true, // This is the only way to prevent WebP conversion
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    eslint:{
        ignoreDuringBuilds: true,
    },
    typescript:{
        ignoreBuildErrors: true,
    },
};

export default nextConfig;