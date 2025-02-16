import { useState } from "react";
import { UserDTO } from "@/app/types/types";

const useUpdateUser = (initialUserData: UserDTO) => {
    const [userData, setUserData] = useState<UserDTO>(initialUserData);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            if (response.ok) {
                setSuccess('Successfully updated user data');
                setError('');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
                setSuccess('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
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
