import React from 'react';
import CarGrid from '@/app/components/common/CarGrid';
import useCarPreview from '@/app/hooks/useCarPreview';

interface ListingPageProps {
    carCount?: number;
    columns?: {
        sm?: number;
        md?: number;
        lg?: number;
    };
    imageHeight?: string; // New prop for image height
    imageWidth?: string; // New prop for image width
}

const ListingPage: React.FC<ListingPageProps> = ({
                                                     carCount = 30,
                                                     columns = { sm: 2, lg: 6 },
                                                     imageHeight = "h-32", // Default height
                                                     imageWidth = "w-full"
                                                 }) => {
    const { cars, carImages, loading, error } = useCarPreview();

    return (
        <div className="flex flex-col">
            <CarGrid
                columns={columns}
                carCount={carCount}
                cars={cars}
                carImages={carImages}
                loading={loading}
                error={error}
                imageHeight={imageHeight}
                imageWidth={imageWidth}
            />
        </div>
    );
};

export default ListingPage;
