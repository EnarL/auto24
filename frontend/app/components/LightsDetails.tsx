import React from 'react';

interface LightsDetailsProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LightsDetails: React.FC<LightsDetailsProps> = ({ formData, handleChange }) => {
    // List of light details
    const lightsDetails = [
        { name: "xenon", label: "Xenon" },
        { name: "laser", label: "Laser" },
        { name: "led", label: "LED" },
        { name: "headlightWashers", label: "Esitulede pesurid" },
        { name: "corneringLights", label: "Kurvituled" },
        { name: "daytimeRunningLights", label: "Päevasõidutulede automaatne lülitus" },
        { name: "highBeamAssist", label: "Kaugtulede ümberlülitamise assistent" },
        { name: "fogLights", label: "Udutuled" },
        { name: "headlightLeveling", label: "Tulede korrektor" },
        { name: "additionalLights", label: "Lisatuled" },
        { name: "lightingPackage", label: "Valgustuspakett" }
    ];

    return (
        <div>
            <h2 className="text-[16px] mb-2 mt-2">TULED</h2>
            <div className="grid grid-cols-2 text-[12px]">
                {lightsDetails.map((light) => (
                    <label
                        key={light.name}
                        className="flex items-center bg-gray-50 p-2 border-b border-gray-200"
                    >
                        <input
                            type="checkbox"
                            name={light.name}
                            checked={formData[light.name]}
                            onChange={handleChange}
                            className="h-4 w-4 square-checkbox focus:border-blue-600 focus:outline-none mr-2"
                        />
                        {light.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default LightsDetails;
