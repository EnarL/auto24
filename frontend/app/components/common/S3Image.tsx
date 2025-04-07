import React from "react";

interface S3ImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    loading?: 'lazy' | 'eager';  // Add loading attribute with 'lazy' or 'eager' as valid options
}

const S3Image: React.FC<S3ImageProps> = ({ src, alt, className, style, loading = "lazy" }) => {
    return (
        <img
            src={src}
            alt={alt}
            width={240}
            height={150}
            className={className}
            style={{ ...style, objectFit: 'cover' }}
            loading={loading}
        />
    );
};

export default S3Image;
