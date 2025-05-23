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
    imageHeight?: string;
    imageWidth?: string;
    prioritizeFirstImages?: boolean;
}

const ListingPage: React.FC<ListingPageProps> = ({
                                                     carCount = 30,
                                                     columns = { sm: 2, lg: 6 },
                                                     imageHeight = "h-32",
                                                     imageWidth = "w-full",
                                                     prioritizeFirstImages = false
                                                 }) => {
    const { cars, loading, error } = useCarPreview();

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-gray-700 mb-6">VALIK KUULUTUSI</h1>
            <CarGrid
                columns={columns}
                carCount={carCount}
                cars={cars}
                loading={loading}
                error={error}
                imageHeight={imageHeight}
                imageWidth={imageWidth}
                prioritizeFirstImages={prioritizeFirstImages}
            />
        </div>
    );
};

export default ListingPage;