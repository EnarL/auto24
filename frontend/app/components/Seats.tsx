import React from 'react';

interface SeatsProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Seats: React.FC<SeatsProps> = ({ formData, handleChange }) => {
    // List of seat options
    const seatOptions = [
        { name: "leatherUpholstery", label: "Nahkpolster" },
        { name: "partialLeatherUpholstery", label: "Poolnahkpolster" },
        { name: "velourUpholstery", label: "Veluurpolster" },
        { name: "textileUpholstery", label: "Tekstiilpolster" },
        { name: "electricallyAdjustableSeats", label: "Elektriliselt reguleeritavad istmed" },
        { name: "airAdjustableSeat", label: "Õhuga reguleeritav iste" },
        { name: "heightAdjustableSeats", label: "Istmed reguleeritava kõrgusega" },
        { name: "seatHeaters", label: "Istmesoojendused" },
        { name: "adjustableLumbarSupport", label: "Reguleeritava kumerusega seljatugi" },
        { name: "massageSeats", label: "Massaažifunktsiooniga istmed" },
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
            <h2 className="text-lg font-semibold mb-4">ISTMED</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {seatOptions.map((item) => (
                    <label
                        key={item.name}
                        className="flex items-center bg-gray-50 p-2 border-b border-gray-200"
                    >
                        <input
                            type="checkbox"
                            name={item.name}
                            checked={formData[item.name]}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Seats;
