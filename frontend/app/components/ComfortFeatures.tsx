import React from 'react';

interface ComfortFeaturesProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ComfortFeatures: React.FC<ComfortFeaturesProps> = ({ formData, handleChange }) => {
    // List of comfort features
    const features = [
        { name: "climateControl", label: "Kliimaseade" },
        { name: "electricExteriorMirrors", label: "Elektrilised välispeeglid" },
        { name: "virtualExteriorMirrors", label: "Virtuaalsed välispeeglid" },
        { name: "virtualInteriorMirror", label: "Virtuaalne sisepeegel" },
        { name: "electricWindowLifters", label: "Elektrilised akende tõstukid" },
        { name: "tintedWindows", label: "Toonitud klaasid" },
        { name: "sunroof", label: "Katuseluuk" },
        { name: "panoramicRoof", label: "Panoraamkatus (klaasist)" },
        { name: "doorServoClosers", label: "Uste servosulgurid" },
        { name: "keylessEntry", label: "Võtmeta avamine" },
        { name: "keylessStart", label: "Võtmeta käivitus" },
        { name: "cruiseControl", label: "Püsikiiruse hoidja" },
        { name: "electricTrunkOpening", label: "Pakiruumi avamine elektriliselt" },
        { name: "mirrorsInSunVisors", label: "Peeglid päikesesirmides" },
        { name: "rearWindowSunblind", label: "Rulookardin tagaaknal" },
        { name: "doorSunblinds", label: "Rulookardinad ustel" },
        { name: "enginePreheater", label: "Mootori eelsoojendus" },
        { name: "cabinPreheater", label: "Salongi eelsoojendus" },
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
            <h2 className="text-lg font-semibold mb-4">MUGAVUSVARUSTUS</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {features.map((feature) => (
                    <label
                        key={feature.name}
                        className="flex items-center bg-gray-50 p-2 border-b border-gray-200"
                    >
                        <input
                            type="checkbox"
                            name={feature.name}
                            checked={formData[feature.name]}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        {feature.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ComfortFeatures;
