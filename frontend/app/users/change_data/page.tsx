"use client";

import React, { useEffect } from "react";
import UserLayout from "@/app/components/user/UserLayout";
import FormInput from "@/app/components/user/FormInput";
import CheckboxInput from "@/app/components/user/CheckBoxInput";
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
            <div className="w-[740px] ml-[10px] p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Muuda kasutajaandmeid</h2>
                <p className="italic text-sm text-gray-500 mb-6">Tärniga (*) tähistatud väljad on kohustuslikud!</p>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                        <span className="text-gray-700 font-medium">Meiliaadress:</span>
                        <span className={`${active ? "text-green-600" : "text-red-600"} font-semibold`}>
                            {userData.email}
                        </span>
                        <span className={`${active ? "text-green-600" : "text-red-600"} ml-4`}>
                            {active ? "Aktiivne" : "Pole kinnitatud"}
                        </span>
                    </div>

                    {[
                        {
                            id: "firstname",
                            label: "Eesnimi *",
                            value: userData.firstname,
                            setter: (value: string) => setUserData((prev: UserDTO) => ({ ...prev, firstname: value }))
                        },
                        {
                            id: "lastname",
                            label: "Perekonnanimi *",
                            value: userData.lastname,
                            setter: (value: string) => setUserData((prev: UserDTO) => ({ ...prev, lastname: value }))
                        },
                        {
                            id: "telefon",
                            label: "Telefon",
                            value: userData.phoneNumber,
                            setter: (value: string) => setUserData((prev: UserDTO) => ({ ...prev, phoneNumber: value }))
                        },
                    ].map(({ id, label, value, setter }) => (
                        <FormInput
                            key={id}
                            id={id}
                            label={label}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    ))}

                    <div className="flex justify-between items-center">
                        <CheckboxInput
                            id="newsletter"
                            label="Soovin saada auto24.ee uudiskirja e-postiga *"
                            checked={userData.newsletter}
                            onChange={(e) => setUserData((prev: UserDTO) => ({ ...prev, newsletter: e.target.checked }))}
                        />
                    </div>

                    <div className="flex justify-between items-center">
                        <CheckboxInput
                            id="terms"
                            label="Nõustun andmekaitse-ja kasutusetingimustega *"
                            checked={true}
                            onChange={() => {}}
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-right">{error}</p>}
                    {success && <p className="text-green-500 text-sm text-right">{success}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                    >
                        MUUDA
                    </button>
                </form>
            </div>
        </UserLayout>
    );
};

export default ChangeData;