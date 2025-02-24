import Image from 'next/image';

interface S3ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const S3Image: React.FC<S3ImageProps> = ({ src, alt, className }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={240}
            height={150}
            className={className}
            priority
        />
    );
};

export default S3Image;