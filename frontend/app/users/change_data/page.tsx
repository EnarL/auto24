"use client";

import React, { useEffect } from "react";
import UserLayout from "@/app/components/UserLayout";
import FormInput from "@/app/components/FormInput";
import CheckboxInput from "@/app/components/CheckBoxInput";
import { useAuthUser } from "@/app/context/AuthUserContext";
import useUpdateUser from "@/app/hooks/useUpdateUserData";
import { UserDTO } from "@/app/types/types";

const ChangeData: React.FC = () => {
    const { username, firstname, lastname, email, phoneNumber, newsletter, active } = useAuthUser();
    const { userData, setUserData, error, success, handleRegister } = useUpdateUser({
        username,
        firstname,
        lastname,
        email,
        phoneNumber,
        newsletter,
        active
    } as UserDTO);

    useEffect(() => {
        setUserData({
            username,
            firstname,
            lastname,
            email,
            phoneNumber,
            newsletter,
            active
        });
    }, [username, firstname, lastname, email, phoneNumber, newsletter, active, setUserData]);

    return (
        <UserLayout activeTab="Muuda andmeid">
            <div className="w-[500px] ml-4 mt-6 flex flex-col">
                <h2 className="text-[24px]">Muuda kasutajaandmeid</h2>
                <p className="italic mt-2 mb-2 text-[12px]">Tärniga (*) tähistatud väljad on kohustuslikud!</p>

                <form onSubmit={handleRegister}>
                    <div className="flex items-center">
                        <span className="block text-gray-700 w-[250px] text-[12px]">Meiliaadress: </span>
                        <span className={`${active ? "text-green-600" : "text-red-600"}`}>
                            {userData.email}
                        </span>
                        <span className={` ${active ? "ml-4 text-green-600" : "text-red-600"}`}>
                            {active ? "Aktiivne" : "Pole kinnitatud"}
                        </span>
                    </div>

                    {[
                        {
                            id: "firstname",
                            label: "Eesnimi *",
                            value: userData.firstname,
                            setter: (value: string) => setUserData((prev: UserDTO) => ({...prev, firstname: value}))
                        },
                        {
                            id: "lastname",
                            label: "Perekonnanimi *",
                            value: userData.lastname,
                            setter: (value: string) => setUserData((prev: UserDTO) => ({...prev, lastname: value}))
                        },
                        {
                            id: "telefon",
                            label: "Telefon",
                            value: userData.phoneNumber,
                            setter: (value: string) => setUserData((prev: UserDTO) => ({...prev, phoneNumber: value}))
                        },
                    ].map(({id, label, value, setter}) => (
                        <FormInput
                            key={id}
                            id={id}
                            label={label}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                        />
                    ))}

                    <div className="flex justify-end mt-4">
                        <CheckboxInput
                            id="newsletter"
                            label="Soovin saada auto24.ee uudiskirja e-postiga *"
                            checked={userData.newsletter}
                            onChange={(e) => setUserData((prev: UserDTO) => ({...prev, newsletter: e.target.checked}))}
                        />
                    </div>

                    <div className="flex justify-end">
                        <CheckboxInput
                            id="terms"
                            label="Nõustun andmekaitse-ja kasutusetingimustega *"
                            checked={true}
                            onChange={() => {}}
                        />
                    </div>

                    {error && <p className="text-red-500 mb-4 text-right">{error}</p>}
                    {success && <p className="text-green-500 mb-4 text-right">{success}</p>}

                    <button
                        type="submit"
                        className="w-[250px] float-end bg-blue-500 text-white hover:bg-blue-600 transition duration-300 pl-10 pr-10 text-[14px] p-1 justify-center items-center mx-auto"
                    >
                        MUUDA
                    </button>
                </form>
            </div>
        </UserLayout>
    );
};

export default ChangeData;
