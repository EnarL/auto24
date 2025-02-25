import React from "react";
import { useAuthUser } from "@/app/context/AuthUserContext";
import Link from "next/link";

interface AuthLinksProps {
    showUserInfo?: boolean;
    onClick?: () => void;
}

const AuthLinks: React.FC<AuthLinksProps> = ({ showUserInfo = false, onClick }) => {
    const { isLoggedIn, firstname, lastname, username, logout } = useAuthUser();

    const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        logout();
        if (onClick) onClick();
    };

    return (
        <div className="flex flex-row items-center space-x-2">
            {isLoggedIn ? (
                <>
                    {showUserInfo && (
                        <Link href="/users/change_data" className="hover:text-blue-600" onClick={onClick}>
                            {firstname} {lastname} / {username}
                        </Link>
                    )}
                    <a href="#" onClick={handleLogout} className="hover:text-blue-600">
                        Logi välja
                    </a>
                </>
            ) : (
                <Link href="/login" className="hover:text-blue-600" onClick={onClick}>
                    Logi sisse
                </Link>
            )}
        </div>
    );
};

export default AuthLinks;
