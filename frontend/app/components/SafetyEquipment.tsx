import React from 'react';

interface SafetyEquipmentProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SafetyEquipment: React.FC<SafetyEquipmentProps> = ({ formData, handleChange }) => {
    // List of safety equipment
    const safetyEquipment = [
        { name: "powerSteering", label: "Roolivõimendi" },
        { name: "centralLocking", label: "Kesklukustus" },
        { name: "absBrakes", label: "ABS pidurid" },
        { name: "electronicParkingBrake", label: "Elektrooniline seisupidur" },
        { name: "airbag", label: "Turvapadi" },
        { name: "curtainAirbags", label: "Turvakardinad" },
        { name: "passengerAirbagDeactivation", label: "Kõrvalistuja turvapadja väljalülitamise võimalus" },
        { name: "driverFatigueDetection", label: "Juhi väsimuse tuvastamise süsteem" },
        { name: "alarm", label: "Signalisatsioon" },
        { name: "immobilizer", label: "Immobilisaator" },
        { name: "stabilityControl", label: "Stabiilsuskontroll" },
        { name: "brakeForceControl", label: "Pidurdusjõukontroll" },
        { name: "tractionControl", label: "Veojõukontroll" },
        { name: "laneKeepingAssist", label: "Sõiduraja hoidmise abisüsteem" },
        { name: "laneChangeAssist", label: "Sõiduraja vahetamise abisüsteem" },
        { name: "trafficSignRecognition", label: "Liiklusmärkide tuvastus ja kuvamine" },
        { name: "nightVisionAssist", label: "Öise nägemise assistent" },
        { name: "blindSpotWarning", label: "Pimenurga hoiatus" },
        { name: "collisionPreventionBrake", label: "Kokkupõrget ennetav pidurisüsteem" },
        { name: "pedestrianSafetyHood", label: "Jalakäija ohutusfunktsiooniga kapott" },
        { name: "automaticBrakingSystem", label: "Automaatpidurdussüsteem" },
        { name: "additionalBrakeLight", label: "Lisapidurituli" },
        { name: "rainSensor", label: "Vihmasensor" },
        { name: "isofix", label: "ISOFIX lasteistme kinnitus" },
        { name: "integratedChildSeat", label: "Integreeritud lapseiste" },
        { name: "seatbeltPretensioners", label: "Turvavööde eelpingutid esiistmetel" },
        { name: "autoHold", label: "Automaatne paigalseismise funktsioon / mägistardi abi" },
        { name: "hillBrake", label: "Mägipidur" }
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">TURVA- JA OHUTUSVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {safetyEquipment.map((item) => (
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

export default SafetyEquipment;
