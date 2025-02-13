import React, { useState } from 'react';

interface SeatsProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Seats: React.FC<SeatsProps> = ({ formData, handleChange }) => {
    const [showLeatherUpholsteryInfo, setShowLeatherUpholsteryInfo] = useState(false);
    const [showPartialLeatherUpholsteryInfo, setShowPartialLeatherUpholsteryInfo] = useState(false);
    const [showVelourUpholsteryInfo, setShowVelourUpholsteryInfo] = useState(false);
    const [showTextileUpholsteryInfo, setShowTextileUpholsteryInfo] = useState(false);
    const [showMassageSeatsInfo, setShowMassageSeatsInfo] = useState(false);

    const seatOptions = [
        { name: "leatherUpholstery", label: "Nahkpolster", showInfo: showLeatherUpholsteryInfo, setShowInfo: setShowLeatherUpholsteryInfo },
        { name: "partialLeatherUpholstery", label: "Poolnahkpolster", showInfo: showPartialLeatherUpholsteryInfo, setShowInfo: setShowPartialLeatherUpholsteryInfo },
        { name: "velourUpholstery", label: "Veluurpolster", showInfo: showVelourUpholsteryInfo, setShowInfo: setShowVelourUpholsteryInfo },
        { name: "textileUpholstery", label: "Tekstiilpolster", showInfo: showTextileUpholsteryInfo, setShowInfo: setShowTextileUpholsteryInfo },
        { name: "electricallyAdjustableSeats", label: "Elektriliselt reguleeritavad istmed" },
        { name: "airAdjustableSeat", label: "Õhuga reguleeritav iste" },
        { name: "heightAdjustableSeats", label: "Istmed reguleeritava kõrgusega" },
        { name: "seatHeaters", label: "Istmesoojendused" },
        { name: "adjustableLumbarSupport", label: "Reguleeritava kumerusega seljatugi" },
        { name: "massageSeats", label: "Massaažifunktsiooniga istmed", showInfo: showMassageSeatsInfo, setShowInfo: setShowMassageSeatsInfo },
        { name: "ventilatedSeats", label: "Ventileeritavad istmed" },
        { name: "frontArmrest", label: "Käetugi ees" },
        { name: "rearArmrest", label: "Käetugi taga" },
        { name: "foldingPassengerSeatBackrest", label: "Kaassõitja istme seljatugi allaklapitav" },
        { name: "foldingRearSeatBackrest", label: "Tagaistme seljatugi allaklapitav" },
        { name: "comfortSeats", label: "Comfort istmed" },
        { name: "sportSeats", label: "Sportistmed" }
    ];

    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">ISTMED</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {seatOptions.map((item) => (
                    <div key={item.name} className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name={item.name}
                                checked={formData[item.name]}
                                onChange={handleChange}
                                className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                            />
                            {item.label}
                            {(item.name === "leatherUpholstery" || item.name === "partialLeatherUpholstery" || item.name === "velourUpholstery" || item.name === "textileUpholstery" || item.name === "massageSeats") && item.setShowInfo && (
                                <button
                                    type="button"
                                    onClick={() => item.setShowInfo(!item.showInfo)}
                                    className="ml-2 text-blue-600"
                                >
                                    +
                                </button>
                            )}
                        </label>
                        {item.showInfo && (
                            <input
                                type="text"
                                name={`${item.name}Info`}
                                value={formData[`${item.name}Info`]}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:border-blue-600 focus:outline-none mt-2"
                                placeholder={`Lisa ${item.label} lisainfo`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Seats;