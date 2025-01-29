import React, { useState } from 'react';

interface ComfortFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ComfortFeatures: React.FC<ComfortFeaturesProps> = ({ formData, handleChange }) => {
    const [showSunroofInfo, setShowSunroofInfo] = useState(false);
    const [showEnginePreheaterInfo, setShowEnginePreheaterInfo] = useState(false);
    const [showCabinPreheaterInfo, setShowCabinPreheaterInfo] = useState(false);

    const features = [
        { name: "climateControl", label: "Kliimaseade" },
        { name: "electricExteriorMirrors", label: "Elektrilised välispeeglid" },
        { name: "virtualExteriorMirrors", label: "Virtuaalsed välispeeglid" },
        { name: "virtualInteriorMirror", label: "Virtuaalne sisepeegel" },
        { name: "electricWindowLifters", label: "Elektrilised akende tõstukid" },
        { name: "tintedWindows", label: "Toonitud klaasid" },
        { name: "sunroof", label: "Katuseluuk", showInfo: showSunroofInfo, setShowInfo: setShowSunroofInfo },
        { name: "panoramicRoof", label: "Panoraamkatus (klaasist)" },
        { name: "doorServoClosers", label: "Uste servosulgurid" },
        { name: "keylessEntry", label: "Võtmeta avamine" },
        { name: "keylessStart", label: "Võtmeta käivitus" },
        { name: "cruiseControl", label: "Püsikiiruse hoidja" },
        { name: "electricTrunkOpening", label: "Pakiruumi avamine elektriliselt" },
        { name: "mirrorsInSunVisors", label: "Peeglid päikesesirmides" },
        { name: "rearWindowSunblind", label: "Rulookardin tagaaknal" },
        { name: "doorSunblinds", label: "Rulookardinad ustel" },
        { name: "enginePreheater", label: "Mootori eelsoojendus", showInfo: showEnginePreheaterInfo, setShowInfo: setShowEnginePreheaterInfo },
        { name: "cabinPreheater", label: "Salongi eelsoojendus", showInfo: showCabinPreheaterInfo, setShowInfo: setShowCabinPreheaterInfo },
        { name: "additionalCabinHeater", label: "Salongi lisasoojendus" },
        { name: "integratedGarageOpener", label: "Integreeritud väravapult" },
        { name: "autoDimmingMirrors", label: "Automaatselt tumenevad peeglid" },
        { name: "rearSeatClimateControl", label: "Eraldi kliimaseade tagaistmetele" },
        { name: "doorInteriorLighting", label: "Uste sisevalgustus" },
        { name: "readingLights", label: "Kohtvalgustid" },
        { name: "parkingSensors", label: "Parkimisandurid" },
        { name: "parkingCamera", label: "Parkimiskaamera" },
        { name: "automaticParking", label: "Automaatse parkimise funktsioon" },
        { name: "comingLeavingHomeFunction", label: "Coming-/Leaving-Home funktsioon" },
        { name: "digitalInstrumentPanel", label: "Digitaalne näidikutepaneel" },
        { name: "headUpDisplay", label: "Info kuvamine esiklaasile" },
        { name: "trunkSlidingFloor", label: "Pakiruumi liugpõrand" },
        { name: "electricSlidingDoors", label: "Elektrilised liuguksed" },
        { name: "wirelessPhoneCharging", label: "Telefoni juhtmevaba laadimine" }
    ];

    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">MUGAVUSVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {features.map((feature) => (
                    <div key={feature.name} className="flex flex-col bg-gray-50 p-2 border-b border-gray-200">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name={feature.name}
                                checked={formData[feature.name]}
                                onChange={handleChange}
                                className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                            />
                            {feature.label}
                            {(feature.name === "sunroof" || feature.name === "enginePreheater" || feature.name === "cabinPreheater") && feature.setShowInfo && (
                                <button
                                    type="button"
                                    onClick={() => feature.setShowInfo(!feature.showInfo)}
                                    className="ml-2 text-blue-600"
                                >
                                    +
                                </button>
                            )}
                        </label>
                        {feature.showInfo && (
                            <input
                                type="text"
                                name={`${feature.name}Info`}
                                value={formData[`${feature.name}Info`]}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 text-[12px] focus:border-blue-600 focus:outline-none mt-2"
                                placeholder={`Lisa ${feature.label} lisainfo`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComfortFeatures;