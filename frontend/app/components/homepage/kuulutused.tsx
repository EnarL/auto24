import React from 'react';
import CarGrid from '@/app/components/CarGrid';
import useCarPreview from '@/app//hooks/useCarPreview';



const PublicPreviewPage: React.FC = () => {
    const {cars, carImages, loading, error} = useCarPreview();

    return (
        <div className="flex flex-col">
            <CarGrid
                columns={6}
                carCount={30}
                cars={cars}
                carImages={carImages}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default PublicPreviewPage;
