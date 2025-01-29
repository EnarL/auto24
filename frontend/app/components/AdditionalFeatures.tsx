import React, { useState } from 'react';

interface AdditionalFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdditionalFeatures: React.FC<AdditionalFeaturesProps> = ({ formData, handleChange }) => {
    const [showRoofRailsInfo, setShowRoofRailsInfo] = useState(false);
    const [showDoubleGlazingInfo, setShowDoubleGlazingInfo] = useState(false);

    return (
        <div>
            <h1 className="text-[16px] mb-2 mt-2 ">MUU VARUSTUS</h1>
            <div className="grid grid-cols-2 text-[12px]">
                {[
                    { name: "adjustableSuspension", label: "Reguleeritav vedrustus" },
                    { name: "airSuspension", label: "Õhkvedrustus" },
                    { name: "startStopSystem", label: "Start-stopp süsteem" },
                    { name: "powerOutlets12V", label: "12v pistikupesad" },
                    { name: "roofRails", label: "Katusereelingud", showInfo: showRoofRailsInfo, setShowInfo: setShowRoofRailsInfo },
                    { name: "skiBag", label: "Suusakott" },
                    { name: "tireRepairKit", label: "Rehviparanduskomplekt" },
                    { name: "cooledGloveBox", label: "Jahutusega kindalaegas" },
                    { name: "outsideTemperatureGauge", label: "Välistemperatuuri näidik" },
                    { name: "doubleGlazing", label: "Topeltklaasid", showInfo: showDoubleGlazingInfo, setShowInfo: setShowDoubleGlazingInfo },
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
                            {(item.name === "roofRails" || item.name === "doubleGlazing") && item.setShowInfo && (
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
                <label className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                    <span className="mb-2">Muud lisad (eraldamiseks kasuta semikoolonit ;)</span>
                    <input
                        type="text"
                        name="otherExtras"
                        value={formData.otherExtras}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:border-blue-600 focus:outline-none mr-2"
                        placeholder="Lisa oma lisad"
                    />
                </label>
            </div>
        </div>
    );
};

export default AdditionalFeatures;