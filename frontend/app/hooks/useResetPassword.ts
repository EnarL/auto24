import { useState } from "react";

const useResetPassword = (token: string | null) => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleResetPassword = async (newPassword: string, confirmPassword: string) => {
        setMessage("");
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Paroolid ei ühti.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/auth/reset-password?token=${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    newPassword: newPassword,
                    confirmationPassword: confirmPassword,
                }),
            });

            if (response.ok) {
                setMessage("Parool edukalt muudetud!");
            } else {
                setError("Parooli muutmine ebaõnnestus. Palun proovige uuesti.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Viga. Palun proovige hiljem uuesti.");
        }
    };

    return { message, error, handleResetPassword };
};

export default useResetPassword;