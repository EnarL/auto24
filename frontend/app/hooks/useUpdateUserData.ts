import { useState } from "react";
import { UserDTO } from "@/app/types/types";

const useUpdateUser = (initialUserData: UserDTO) => {
    const [userData, setUserData] = useState<UserDTO>(initialUserData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            if (response.ok) {
                setSuccess('Andmed on edukalt uuendatud');
                setError('');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage || 'Uuendamine ebaõnnestus');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Tekkis viga. Palun proovige uuesti.');
            setSuccess('');
        }
    };

    return {
        userData,
        setUserData,
        error,
        success,
        handleRegister
    };
};

export default useUpdateUser;
