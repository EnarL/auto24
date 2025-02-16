"use client";
import React, { useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import FormInput from "@/app/components/FormInput";
import CheckboxInput from "@/app/components/CheckBoxInput";
import { useAuthUser } from "@/app/context/AuthUserContext";
import useUpdateUser from "@/app/hooks/useUpdateUserData";
import { UserDTO } from "@/app/types/types";

const ChangePasswordPage: React.FC = () => {
    const { username, firstname, lastname, email, phoneNumber, newsletter } = useAuthUser();
    const { userData, setUserData, error, success, handleRegister } = useUpdateUser({
        username,
        firstname,
        lastname,
        email,
        phoneNumber,
        newsletter
    } as UserDTO);

    useEffect(() => {
        setUserData({
            username,
            firstname,
            lastname,
            email,
            phoneNumber,
            newsletter
        });
    }, [username, firstname, lastname, email, phoneNumber, newsletter, setUserData]);

    return (
        <div className="flex">
            <Sidebar activeSection="Muuda andmeid" />
            <div className="w-[500px] mx-auto mt-6 flex flex-col">
                <h2 className="text-[24px] p-2">Kasutajaks registreerumine</h2>
                <p className="italic pl-2 text-[12px]">Tärniga (*) tähistatud väljad on kohustuslikud!</p>
                <form className="" onSubmit={handleRegister}>
                    {[
                        { id: "username", label: "Kasutajanimi *", value: userData.username, setter: (value: string) => setUserData((prev: UserDTO) => ({ ...prev, username: value })) },
                        { id: "email", label: "Meiliaadress *", value: userData.email, setter: (value: string) => setUserData((prev: UserDTO) => ({ ...prev, email: value })) },
                        { id: "firstname", label: "Eesnimi *", value: userData.firstname, setter: (value: string) => setUserData((prev: UserDTO) => ({ ...prev, firstname: value })) },
                        { id: "lastname", label: "Perekonnanimi *", value: userData.lastname, setter: (value: string) => setUserData((prev: UserDTO) => ({ ...prev, lastname: value })) },
                        { id: "telefon", label: "Telefon", value: userData.phoneNumber, setter: (value: string) => setUserData((prev: UserDTO) => ({ ...prev, phoneNumber: value })) },
                    ].map(({ id, label, value, setter }) => (
                        <FormInput
                            key={id}
                            id={id}
                            label={label}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                        />
                    ))}
                    <CheckboxInput
                        id="newsletter"
                        label="Soovin saada auto24.ee uudiskirja e-postiga *"
                        checked={userData.newsletter}
                        onChange={(e) => setUserData((prev: UserDTO) => ({ ...prev, newsletter: e.target.checked }))}
                    />

                    <CheckboxInput
                        id="terms"
                        label="Nõustun andmekaitse-ja kasutusetingimustega *"
                        checked={true}
                        onChange={() => {}}
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>}
                    <button
                        type="submit"
                        className="w-[250px] float-end bg-blue-500 text-white hover:bg-blue-600 transition duration-300 pl-10 pr-10 text-[14px] p-1 justify-center items-center mx-auto"
                    >
                        MUUDA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
