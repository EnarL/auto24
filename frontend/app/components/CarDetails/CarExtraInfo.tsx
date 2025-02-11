import React from "react";
import {CarExtraInfoDTO} from "@/app/types/types";

const CarExtraInfo: React.FC<{ carExtraInfo: CarExtraInfoDTO | null }> = ({ carExtraInfo }) => {
    const renderList = (info: Record<string, boolean>) => {
        return Object.entries(info).map(([key, value], index) =>
            value ? <li key={index}>✓ {key.replace(/([A-Z])/g, ' $1').toUpperCase()}</li> : null
        );
    };
    return (
        <>
            <div className="grid grid-cols-2 gap-5 pt-5">
                <div>
                    <p className="font-semibold">TURVA- JA OHUTUSVARUSTUS</p>
                    <ul>{renderList(carExtraInfo?.safetyAndSecurity || {})}</ul>
                </div>
                <div>
                    <p className="font-semibold">TULED</p>
                    <ul>{renderList(carExtraInfo?.lights || {})}</ul>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-5 pt-5">
                <div>
                    <p className="font-semibold">REHVID JA VELJED</p>
                    <ul>{renderList(carExtraInfo?.tiresAndWheels || {})}</ul>
                </div>
                <div>
                    <p className="font-semibold">ROOL</p>
                    <ul>{renderList(carExtraInfo?.steering || {})}</ul>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 pt-5">
                <div>
                    <p className="font-semibold">ISTMED</p>
                    <ul>{renderList(carExtraInfo?.seats || {})}</ul>
                </div>
                <div>
                    <p className="font-semibold">MUGAVUSVARUSTUS</p>
                    <ul>{renderList(carExtraInfo?.comfortFeatures || {})}</ul>
                </div>
            </div>
        </>
    );
};

export default CarExtraInfo;
