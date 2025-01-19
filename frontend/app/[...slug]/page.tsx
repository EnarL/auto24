"use client";

import { useParams } from 'next/navigation';

const BrandPage = () => {
    const { slug } = useParams();
    const slugString = Array.isArray(slug) ? slug[0] : slug;
    const decodedSlug = slugString ? decodeURIComponent(slugString) : '';

    return (
        <div>
            <h1 className="text-2xl p-2">{decodedSlug.toUpperCase()}</h1>
            <h1 className="p-2 text-xl">SÕIDUKIKUULUTUSED</h1>
            <div className="p-3 border-2 grid grid-cols-4 w-[1000px]">
                <div className="border-r-2 w-[250px]">Column 1</div>
                <div className="border-r-2 w-[250px]">Column 2</div>
                <div className="border-r-2 w-[250px]">Column 3</div>
                <div className="w-[250px]">Column 4</div>
            </div>
            <h1 className="mt-6 text-xl">AUTOKAUBAD JA VARUOSAD</h1>
        </div>
    );
};

export default BrandPage;