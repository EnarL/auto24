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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?token=${token}`, {
                    method: "GET",
                });

                if (response.ok) {
                    setValidToken(true);
                } else {
                    setError("Vigane või aegunud link.");
                }
            } catch (err) {
                console.error("Error:", err);
                setError("Midagi läks valesti. Palun proovige uuesti.");
            }
        };

        verifyToken();
    }, [token]);

    return { validToken, error };
};

export default useVerifyToken;