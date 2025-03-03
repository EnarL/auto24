import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface Props {
    carId: string;
}

interface Salesman {
    firstname: string;
    phoneNumber: string;
    email: string;
}

const SalesmanInfo: React.FC<Props> = ({ carId }) => {
    const [salesman, setSalesman] = useState<Salesman | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSalesmanInfo = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:8080/users/SalesmanInfo/${carId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch salesman info");
                }
                const data: Salesman = await response.json();
                setSalesman(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        if (carId) {
            fetchSalesmanInfo();
        }
    }, [carId]);

    if (loading) return <p>Loading salesman information...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!salesman) return <p>No salesman information available.</p>;

    return (
        <div className="salesman-info text-[16px] m-1 ">
            <h3 className="font-semibold mb-2">{salesman.firstname}</h3>
            <div className="flex items-center mb-2">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                <span>+372{salesman.phoneNumber}</span>
            </div>
            <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 " />
                <span>testemail@gmail.com</span>
            </div>
        </div>
    );
};

export default SalesmanInfo;