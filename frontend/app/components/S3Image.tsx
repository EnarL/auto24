import Image from 'next/image';

interface S3ImageProps {
    src: string;
    alt: string;
    className?: string; // Add className as an optional prop
}

const S3Image: React.FC<S3ImageProps> = ({ src, alt, className }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={250}
            height={160}
            className={className}
            priority
        />
    );
};

export default S3Image;