import React from 'react';

interface AdditionalFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalFeatures: React.FC<AdditionalFeaturesProps> = ({ formData, handleChange }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">MUU VARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {[
                    { name: "adjustableSuspension", label: "Reguleeritav vedrustus" },
                    { name: "airSuspension", label: "Õhkvedrustus" },
                    { name: "startStopSystem", label: "Start-stopp süsteem" },
                    { name: "powerOutlets12V", label: "12v pistikupesad" },
                    { name: "roofRails", label: "Katusereelingud" },
                    { name: "skiBag", label: "Suusakott" },
                    { name: "tireRepairKit", label: "Rehviparanduskomplekt" },
                    { name: "cooledGloveBox", label: "Jahutusega kindalaegas" },
                    { name: "outsideTemperatureGauge", label: "Välistemperatuuri näidik" },
                    { name: "doubleGlazing", label: "Topeltklaasid" },
                    { name: "heatedWindshield", label: "Elektrilise soojendusega esiklaas" },
                    { name: "rearWindowHeater", label: "Tagaklaasi soojendus" },
                    { name: "windshieldWasherNozzleHeater", label: "Aknapesupihustite sulatus" },
                    { name: "trunkCover", label: "Pagasikate" },
                    { name: "trunkNet", label: "Pagasi võrk pakiruumis" },
                    { name: "trunkPartitionNet", label: "Salongi ja pakiruumi eraldusvõrk" },
                    { name: "cargoHooks", label: "Kaubakinnituse konksud" },
                    { name: "rearWindowWiper", label: "Tagaklaasi puhasti" },
                    { name: "installedFireExtinguisher", label: "Paigaldatud tulekustuti" },
                    { name: "towHook", label: "Veokonks" },
                    { name: "trailerStabilizationSystem", label: "Haagise stabiliseerimissüsteem" },
                    { name: "tripComputer", label: "Reisiarvesti" },
                    { name: "mudFlaps", label: "Esi- ja tagarataste porikummid" },
                    { name: "disabledEquipment", label: "Invavarustus" },
                    { name: "fourWheelSteering", label: "4-ratta pööramine" },
                    { name: "registeredAsN1Van", label: "Arvel kui N1 kaubik" }
                ].map((item) => (
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
                <label className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                    <span className="mb-2">Muud lisad (eraldamiseks kasuta semikoolonit ;)</span>
                    <input
                        type="text"
                        name="otherExtras"
                        value={formData.otherExtras}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 text-[12px]"
                        placeholder="Lisa oma lisad"
                    />
                </label>
            </div>
        </div>
    );
};

export default AdditionalFeatures;
