import { useState } from 'react';

const useChangePassword = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const changePassword = async (curPassword: string, newPassword: string, confirmationPassword: string) => {
        try {
            const response = await fetch('http://localhost:8080/users/change-password', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        currentPassword: curPassword,
                        newPassword: newPassword,
                        confirmationPassword: confirmationPassword
                    }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Error changing password');
            }

            setSuccess('Password changed successfully');
        } catch (err) {
            // @ts-ignore
            setError(err.message);
        }
    };

    return { changePassword, error, success };
};

export default useChangePassword;
