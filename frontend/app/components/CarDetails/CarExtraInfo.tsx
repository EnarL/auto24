import React from "react";
import { CarExtraInfoDTO } from "@/app/types/types";

const CarExtraInfo: React.FC<{ carExtraInfo: CarExtraInfoDTO | null }> = ({ carExtraInfo }) => {
    const extractBooleanProperties = <T extends Record<string, boolean | string>>(obj: T): Record<string, boolean> => {
        return Object.keys(obj).reduce((acc, key) => {
            if (typeof obj[key] === 'boolean') {
                acc[key] = obj[key];
            }
            return acc;
        }, {} as Record<string, boolean>);
    };

    const renderList = (info: Record<string, boolean>) => {
        return Object.entries(info).map(([key, value]) =>
            value ? (
                <li key={key} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {key.replace(/([A-Z])/g, ' $1')}
                </li>
            ) : null
        ).filter(Boolean);
    };

    const renderSection = (title: string, info: Record<string, boolean | string> | undefined) => {
        const list = info ? renderList(extractBooleanProperties(info)) : [];
        return list.length > 0 ? (
            <div className="flex flex-col p-4 border rounded-lg shadow-md bg-gray-50 mb-4 h-full">
                <p className="font-semibold text-lg mb-2">{title}</p>
                <ul className="list-disc pl-5">{list}</ul>
            </div>
        ) : null;
    };

    return (
        <div className="car-extra-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
            {renderSection("TURVA- JA OHUTUSVARUSTUS", carExtraInfo?.safetyAndSecurity)}
            {renderSection("TULED", carExtraInfo?.lights)}
            {renderSection("REHVID JA VELJED", carExtraInfo?.tiresAndWheels)}
            {renderSection("ROOL", carExtraInfo?.steering)}
            {renderSection("ISTMED", carExtraInfo?.seats)}
            {renderSection("MUGAVUSVARUSTUS", carExtraInfo?.comfortFeatures)}
            {renderSection("MUU VARUSTUS", carExtraInfo?.additional)}
            {renderSection("AUDIO, VIDEO, KOMMUNIKATSIOON", carExtraInfo?.audioVideoCommunication)}
            {renderSection("SISUSTUS", carExtraInfo?.interiorFeatures)}
            {renderSection("SPORTVARUSTUS", carExtraInfo?.sportFeatures)}
        </div>
    );
};

export default CarExtraInfo;