import React from "react";

interface S3ImageProps {
    src: string,
    alt: string,
    className?: string,
    style?: React.CSSProperties
}

const S3Image: React.FC<S3ImageProps> = ({src, alt, className, style}) => {
    return (
        <img
            src={src}
            alt={alt}
            width={240}
            height={150}
            className={className}
            style={{ ...style, objectFit: 'cover' }}
        />
    );
};

export default S3Image;