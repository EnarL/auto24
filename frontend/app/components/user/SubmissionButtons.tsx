import React from 'react';
import { useRouter } from 'next/navigation';

interface SubmissionButtonsProps {
    carId: string;
}

const SubmissionButtons: React.FC<SubmissionButtonsProps> = ({ carId }) => {
    const router = useRouter();

    return (
        <div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
            <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
                onClick={() => router.push(`/users/lisa_pildid/${carId}`)}
            >
                Piltide lisamine
            </button>
        </div>
    );
};

export default SubmissionButtons;
