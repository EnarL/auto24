import React from "react";
import { CarExtraInfoDTO } from "@/app/types/types";

const CarExtraInfo: React.FC<{ carExtraInfo: CarExtraInfoDTO | null }> = ({ carExtraInfo }) => {
    const extractBooleanProperties = (obj: any): Record<string, boolean> => {
        return Object.keys(obj).reduce((acc, key) => {
            if (typeof obj[key] === 'boolean') {
                acc[key] = obj[key];
            }
            return acc;
        }, {} as Record<string, boolean>);
    };

    const renderList = (info: Record<string, boolean>) => {
        return Object.entries(info).map(([key, value], index) =>
            value ? <li key={index}>✓ {key.replace(/([A-Z])/g, ' $1')}</li> : null
        );
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-5 pt-5">
                <div>
                    <p className="font-semibold">TURVA- JA OHUTUSVARUSTUS</p>
                    <ul>{carExtraInfo?.safetyAndSecurity && renderList(extractBooleanProperties(carExtraInfo.safetyAndSecurity))}</ul>
                </div>
                <div>
                    <p className="font-semibold">TULED</p>
                    <ul>{carExtraInfo?.lights && renderList(extractBooleanProperties(carExtraInfo.lights))}</ul>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 pt-5">
                <div>
                    <p className="font-semibold">REHVID JA VELJED</p>
                    <ul>{carExtraInfo?.tiresAndWheels && renderList(extractBooleanProperties(carExtraInfo.tiresAndWheels))}</ul>
                </div>
                <div>
                    <p className="font-semibold">ROOL</p>
                    <ul>{carExtraInfo?.steering && renderList(extractBooleanProperties(carExtraInfo.steering))}</ul>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 pt-5">
                <div>
                    <p className="font-semibold">ISTMED</p>
                    <ul>{carExtraInfo?.seats && renderList(extractBooleanProperties(carExtraInfo.seats))}</ul>
                </div>
                <div>
                    <p className="font-semibold">MUGAVUSVARUSTUS</p>
                    <ul>{carExtraInfo?.comfortFeatures && renderList(extractBooleanProperties(carExtraInfo.comfortFeatures))}</ul>
                </div>
            </div>
        </>
    );
};

export default CarExtraInfo;