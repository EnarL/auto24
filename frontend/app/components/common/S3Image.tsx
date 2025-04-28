import React from "react";
import Image from "next/image";

interface S3ImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    loading?: 'lazy' | 'eager';
}

const S3Image: React.FC<S3ImageProps> = ({ src, alt, className, style, loading = "lazy" }) => {
    return (
        <div className={`relative overflow-hidden ${className}`} style={style}>
            <Image
                src={src}
                alt={alt}
                fill={true}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                loading={loading}
                unoptimized={false}
                quality={85}
            />
        </div>
    );
};

export default S3Image;