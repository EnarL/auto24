import React from 'react';

interface VehicleDetailsProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ formData, handleChange }) => {
    const vehicleFields = [
        {name: "vehicleType", label: "Liik ja keretüüp", type: "text", required: true},
        {name: "bodyType", label: "Keretüüp (täpsustus)", type: "text"},
        {name: "brand", label: "Mark", type: "text"},
        {name: "model", label: "Mudel", type: "text"},
        {name: "modelName", label: "Mudeli nimi", type: "text"},
        {name: "modelGeneration", label: "Mudeli põlvkond", type: "text"},
        {name: "price", label: "Hind EUR", type: "text"},
        {name: "mileage", label: "Läbisõidumõõdiku näit km", type: "text"},
        {name: "hasServiceBook", label: "Hooldusraamat", type: "checkbox"},
        {name: "vinCode", label: "VIN-kood", type: "text"},
        {name: "registrationNumber", label: "Reg. number", type: "text"},
        {name: "transmission", label: "Käigukast", type: "text"},
        {name: "driveType", label: "Vedav sild", type: "text"},
        {name: "engineCapacityLiters", label: "Mootori maht l", type: "text"},
        {name: "engineCapacityCubicCentimeters", label: "Mootori maht cm³", type: "text"},
        {name: "engineConfiguration", label: "Mootori asetus", type: "text"},
        {name: "engineDetails", label: "Mootori info", type: "text"},
        {name: "enginePowerKW", label: "Mootori võimsus kW", type: "text"},
        {name: "fuelTankCapacity", label: "Kütusepaak", type: "text"},
        {name: "fuelConsumptionHighway", label: "Kütusekulu maanteel", type: "text"},
        {name: "fuelConsumptionCity", label: "Kütusekulu linnas", type: "text"},
        {name: "fuelConsumptionCombined", label: "Kütusekulu (keskmine)", type: "text"},
        {name: "fuelConsumptionStandard", label: "Mõõtestandard", type: "text"},
        {name: "co2Emissions", label: "CO2 g/km", type: "text"},
        {name: "seatingCapacity", label: "Istekohti", type: "text"},
        {name: "numberOfDoors", label: "Uste arv", type: "text"},
        { name: "hasWarranty", label: "Garantii", type: "checkbox" },
        { name: "isAccidentDamaged", label: "Avariiline", type: "checkbox" },
        { name: "color", label: "Värv", type: "text" },
        { name: "isMetallicColor", label: "Metallik värv", type: "checkbox" },
        { name: "colorDetail", label: "Värvi täpsustus", type: "text" },
        { name: "curbWeight", label: "Tühimass", type: "text" },
        { name: "grossWeight", label: "Täismass", type: "text" },
        { name: "payloadCapacity", label: "Kandevõime", type: "text" },
        { name: "brakedTrailerWeight", label: "Piduriga haagis", type: "text" },
        { name: "unbrakedTrailerWeight", label: "Pidurita haagis", type: "text" },
        { name: "wheelbase", label: "Teljevahe", type: "text" },
        { name: "length", label: "Pikkus", type: "text" },
        { name: "width", label: "Laius", type: "text" },
        { name: "height", label: "Kõrgus", type: "text" },
        { name: "acceleration0To100", label: "Kiirendus 0-100km/h", type: "text" },
        { name: "topSpeed", label: "Tippkiirus", type: "text" },
        { name: "locationCountry", label: "Sõiduki asukoht", type: "text", readOnly: true },
        { name: "locationCounty", label: "Maakond", type: "text" },
        { name: "importedFromCountry", label: "Toodud riigist", type: "text" },
        { name: "registeredInCountry", label: "Arvel riigis: Eesti", type: "checkbox" },
        { name: "inspectionValidUntil", label: "Ülevaatus kehtib", type: "text" },
        { name: "isReserved", label: "Broneeritud", type: "checkbox" },
        { name: "reservationUntilDate", label: "Broneeritud kuni", type: "text" },
        { name: "exchangePossible", label: "Vahetuse võimalus", type: "checkbox" },
        { name: "exchangeDetails", label: "Vahetuse detailid", type: "text" },
        { name: "description", label: "Sõiduki kirjeldus", type: "textarea" }
    ];

    return (
        <div>
            <h1 className="text-xl mb-2 mt-2">Sõiduki andmed</h1>
            <div className="border-l-4 border-gray-300 p-4 bg-gray-50 text-[12px] flex flex-col">
                <p>
                    Palume sõiduki
                    <span className="font-bold whitespace-pre"> liigi, margi, mudeli ja esmase reg aja </span>
                    määramisel olla tähelepanelik, sest nende väljade muutmine pärast kuulutuse aktiveerimist ei ole
                    võimalik.
                </p>
                <p>
                    Kuulutuse algset objekti ei või asendada mõne teise objektiga.
                </p>
            </div>
            {vehicleFields.map((field) => {
                return (
                    <div className="flex items-center gap-4 mb-2 text-[12px]" key={field.name}>
                        <label className="text-right bg-gray-100 px-1 py-1 w-[250px] font-bold">
                            {field.label}
                        </label>
                        {field.type === "checkbox" ? (
                            <input
                                type="checkbox"
                                name={field.name}
                                checked={formData[field.name]}
                                onChange={handleChange}
                                className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none"
                            />
                        ) : field.type === "textarea" ? (
                            <textarea
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-[300px] border border-gray-300 px-2 py-1 resize-none h-[80px] focus:border-blue-600 focus:outline-none"
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-[300px] border border-gray-300 px-2 py-1 focus:border-blue-600 focus:outline-none mr-2"
                                readOnly={field.readOnly || false}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default VehicleDetails;