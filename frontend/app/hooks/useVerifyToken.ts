import { useState, useEffect } from "react";

const useVerifyToken = (token: string | null) => {
    const [validToken, setValidToken] = useState(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setError("Vigane link.");
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/auth/reset-password?token=${token}`, {
                    method: "GET",
                });

                if (response.ok) {
                    setValidToken(true);
                } else {
                    setError("Vigane või aegunud link.");
                }
            } catch (error) {
                setError("Midagi läks valesti. Palun proovige uuesti.");
            }
        };

        verifyToken();
    }, [token]);

    return { validToken, error };
};

export default useVerifyToken;
