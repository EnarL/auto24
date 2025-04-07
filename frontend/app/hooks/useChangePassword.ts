import { useState } from 'react';

const useChangePassword = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const changePassword = async (curPassword: string, newPassword: string, confirmationPassword: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/change-password`, {
                method: 'POST',
                body: JSON.stringify({
                    currentPassword: curPassword,
                    newPassword: newPassword,
                    confirmationPassword: confirmationPassword
                }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error changing password');
            }

            setSuccess('Parool muudetud');
            setError(null);  // Clear any existing errors when successful
        } catch (err) {
            const errorMessage = (err as Error).message;

            // Simplified Estonian error messages for user notifications
            if (errorMessage === 'Current password is incorrect') {
                setError('Vale praegune parool');
            } else if (errorMessage === 'New password and confirmation password do not match') {
                setError('Paroolid ei ühti');
            } else if (errorMessage === 'Password must have minimum 8 characters') {
                setError('Parool on liiga lühike');
            } else {
                setError('Viga parooli muutmisel');
            }

            // We no longer log the error in the console as it is a user-facing message
        }
    };

    return { changePassword, error, success };
};

export default useChangePassword;
