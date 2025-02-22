"use client";
import React, { useState } from 'react';
import axios from 'axios';
import ContactDetails from "@/app/components/CarRegistrationForm/ContactDetails";
import VehicleDetails from "@/app/components/CarRegistrationForm/VehicleDetails";
import SafetyEquipment from "@/app/components/CarRegistrationForm/SafetyEquipment";
import AudioVideoCommunicationFeatures from "@/app/components/CarRegistrationForm/AudioVideoCommunication";
import LightsDetails from "@/app/components/CarRegistrationForm/LightsDetails";
import SteeringFeatures from "@/app/components/CarRegistrationForm/Steering";
import Tires from "@/app/components/CarRegistrationForm/Tires";
import InteriorFeatures from "@/app/components/CarRegistrationForm/InteriorFeatures";
import SeatsFeatures from "@/app/components/CarRegistrationForm/Seats";
import ComfortFeatures from "@/app/components/CarRegistrationForm/ComfortFeatures";
import SportFeatures from "@/app/components/CarRegistrationForm/SportFeatures";
import AdditionalFeatures from "@/app/components/CarRegistrationForm/AdditionalFeatures";
import { useRouter } from "next/navigation";
import { CarDetailsDTO, CarExtraInfoDTO } from "@/app/types/types";

const CarDetailsForm: React.FC = () => {
    const router = useRouter();
    const [carDetails, setCarDetails] = useState<CarDetailsDTO>({
        vehicleType: '',
        bodyType: '',
        bodyTypeDetail: '',
        model: '',
        make: '',
        modelGeneration: '',
        modelTrim: '',
        firstRegistrationDate: '',
        price: 0,
        includesRegistrationFee: false,
        discountPrice: false,
        exportPrice: false,
        odometerReading: 0,
        hasServiceBook: false,
        vinCode: '',
        registrationNumber: '',
        transmission: '',
        driveType: '',
        engineCapacityLiters: 0,
        engineCapacityCubicCentimeters: 0,
        engineConfiguration: '',
        engineDetails: '',
        enginePowerKW: 0,
        enginePowerHP: 0,
        fuelType: '',
        fuelTankCapacity: 0,
        fuelConsumptionHighway: 0,
        fuelConsumptionCity: 0,
        fuelConsumptionCombined: 0,
        fuelConsumptionStandard: '',
        co2Emissions: 0,
        seatingCapacity: 0,
        numberOfDoors: 0,
        hasWarranty: false,
        accidentDamaged: false,
        color: '',
        metallicColor: false,
        colorDetail: '',
        curbWeight: 0,
        grossWeight: 0,
        payloadCapacity: 0,
        brakedTrailerWeight: 0,
        unbrakedTrailerWeight: 0,
        wheelbase: 0,
        length: 0,
        width: 0,
        height: 0,
        acceleration0To100: 0,
        topSpeed: 0,
        locationCountry: 'Eesti',
        locationCounty: '',
        importedFromCountry: '',
        registeredInCountry: false,
        inspectionValidUntil: '',
        reserved: false,
        reservationUntilDate: '',
        exchangePossible: false,
        exchangeDetails: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setCarDetails({
                ...carDetails,
                [name]: checked,
            });
        } else {
            setCarDetails({
                ...carDetails,
                [name]: value || '',
            });
        }
    };

    const [carExtraInfo, setCarExtraInfo] = useState<CarExtraInfoDTO>({
        safetyAndSecurity: {
            roolivoimendi: false,
            kesklukustus: false,
            absPidurid: false,
            elektroonilineSeisupidur: false,
            turvapadi: false,
            turvakardinad: false,
            korvalistujaTurvapadjaValjalulitamiseVõimalus: false,
            juhiVäsimuseTuvastamiseSüsteem: false,
            signalisatsioon: false,
            immobilisaator: false,
            stabiilsuskontroll: false,
            pidurdusjoukontroll: false,
            veojoukontroll: false,
            soiduradaHoidmiseAbisüsteem: false,
            soiduradaVahetamiseAbisüsteem: false,
            liiklusmärkideTuvastusJaKuvamine: false,
            oiseNagemiseAssistent: false,
            pimenurgaHoiatus: false,
            kokkuporgetEnnetavPidurisüsteem: false,
            jalakäijaOhutusfunktsioonigaKapott: false,
            automaatpidurdussüsteem: false,
            lisapidurituli: false,
            vihmasensor: false,
            isofixLasteistmeKinnitus: false,
            integreeritudLapseiste: false,
            turvavöödeEelpingutidEsiistmetel: false,
            automaatnePaigalseismiseFunktsioon: false,
            mägipidur: false,
        },
        lights: {
            xenon: false,
            laser: false,
            led: false,
            esituledePesurid: false,
            kurvituled: false,
            päevasõidutuledeAutomaatneLülitus: false,
            kaugtuledeÜmberlülitamiseAssistent: false,
            udutuled: false,
            tuledeKorrektor: false,
            lisatuled: false,
        },
        tiresAndWheels: {
            suverehvid: false,
            talverehvid: false,
            valuveljed: false,
            ilukilbid: false,
            tagavararatas: false,
            rehvirõhuKontrollsüsteem: false,
            autogaKaasaSuverehvid: false,
            autogaKaasaTalverehvid: false,
            autogaKaasaValuveljed: false,
            autogaKaasaIlukilbid: false,
        },
        steering: {
            reguleeritavRoolisammas: false,
            multifunktsionaalneRool: false,
            nahkkattegaRool: false,
            sportrool: false,
            soojendusegaRool: false,
            käiguvahetusRoolilt: false,
            parempoolneRool: false,
        },
        seats: {
            nahkpolster: false,
            nahkpolsterLisainfo: '',
            poolnahkpolster: false,
            poolnahkpolsterLisainfo: '',
            veluurpolster: false,
            veluurpolsterLisainfo: '',
            tekstiilpolster: false,
            tekstiilpolsterLisainfo: '',
            elektriliseltReguleeritavadIstmed: false,
            ohugaReguleeritavIste: false,
            istmedReguleeritavaKorgusega: false,
            istmesoojendused: false,
            reguleeritavaKumerusegaSeljatugi: false,
            massaazifunktsioonigaIstmed: false,
            massaazifunktsioonigaIstmedLisainfo: '',
            ventileeritavadIstmed: false,
            kaetugiEes: false,
            kaetugiTaga: false,
            kaassoitjaIstmeSeljatugiAllaklapitav: false,
            tagaistmeSeljatugiAllaklapitav: false,
            comfortIstmed: false,
            sportistmed: false,
        },
        comfortFeatures: {
            kliimaseade: false,
            elektrilisedValispeeglid: false,
            virtuaalsedValispeeglid: false,
            virtuaalneSisepeegel: false,
            elektrilisedAkendeTostukid: false,
            toonitudKlaasid: false,
            katuseluuk: false,
            katuseluukLisainfo: '',
            panoraamkatus: false,
            usteServosulgurid: false,
            votmetaAvamine: false,
            votmetaKaivitus: false,
            pusikiiruseHoidja: false,
            pakiruumiAvamineElektriliselt: false,
            peeglidPaikesesirmides: false,
            rulookardinTagaaknal: false,
            rulookardinadUstel: false,
            mootoriEelsoojendus: false,
            mootoriEelsoojendusLisainfo: '',
            salongiEelsoojendus: false,
            salongiEelsoojendusLisainfo: '',
            salongiLisasoojendus: false,
            integreeritudVaravapult: false,
            automaatseltTumenevadPeeglid: false,
            eraldiKliimaseadeTagaistmetele: false,
            usteSisevalgustus: false,
            kohtvalgustid: false,
            parkimisandurid: false,
            parkimiskaamera: false,
            automaatseParkimiseFunktsioon: false,
            comingLeavingHomeFunktsioon: false,
            digitaalneNaidikutepaneel: false,
            infoKuvamineEsiklaasile: false,
            pakiruumiLiugpõrand: false,
            elektrilisedLiuguksed: false,
            telefoniJuhtmevabaLaadimine: false,
        },
        additionalFeatures: {
            reguleeritavVedrustus: false,
            ohkvedrustus: false,
            startStoppSusteem: false,
            pistikupesad12v: false,
            katusereelingud: false,
            katusereelingudLisainfo: '',
            suusakott: false,
            rehviparanduskomplekt: false,
            jahutusegaKindalaegas: false,
            valistemperatuuriNaidik: false,
            topeltklaasid: false,
            topeltklaasidLisainfo: '',
            elektriliseSoojendusegaEsiklaas: false,
            tagaklaasiSoojendus: false,
            aknapesupihustiteSulatus: false,
            pagasikate: false,
            pagasiVorkPakiruumis: false,
            salongiJaPakiruumiEraldusvork: false,
            kaubakinnituseKonksud: false,
            tagaklaasiPuhasti: false,
            paigaldatudTulekustuti: false,
            veokonks: false,
            haagiseStabiliseerimissusteem: false,
            reisiarvesti: false,
            esiJaTagaratastePorikummid: false,
            invavarustus: false,
            neljarattaPooramine: false,
            arvelKuiN1Kaubik: false,
            muudLisad: '',
        },
        sportFeatures: {
            tagaspoiler: false,
            esispoiler: false,
            spoileriring: false,
            sportvedrustus: false,
            sportsummuti: false,
        },
        audioVideoCommunication: {
            stereo: false,
            stereoLisainfo: '',
            helivoimendi: false,
            helivoimendiLisainfo: '',
            kolarid: false,
            kolaridLisainfo: '',
            subwoofer: false,
            subwooferLisainfo: '',
            cdBox: false,
            cdBoxLisainfo: '',
            appleCarPlay: false,
            androidAuto: false,
            dvd: false,
            elektrilineAntenn: false,
            ekraan: false,
            ekraanLisainfo: '',
            navigatsiooniseade: false,
            autokompuuter: false,
            autotelefon: false,
            autotelefonLisainfo: '',
            kaedVabadSusteem: false,
            kaedVabadSusteemLisainfo: '',
            gsmAntenn: false,
        },
        interiorFeatures: {
            iluliistudSalongis: false,
            iluliistudSalongisLisainfo: '',
            taskudEsiistmeteSeljatugedes: false,
            jalamatid: false,
            sahtlidEsiistmeteAll: false,
            pagasiruumiMatt: false,
            topsihoidjad: false,
            nahkkattegaKaigukanginupp: false,
            nahkkattegaKasipidurikang: false,
            tumeLaepolster: false,
        },
    });

    const handleExtraInfoChange = (e: React.ChangeEvent<HTMLInputElement>, category: keyof CarExtraInfoDTO) => {
        const { name, type, checked, value } = e.target;

        setCarExtraInfo((prevState) => ({
            ...prevState,
            [category]: {
                ...prevState[category],
                [name]: type === 'checkbox' ? checked : value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const carListingRequest = {
            carDetailsDTO: carDetails,
            carExtraInfoDTO: carExtraInfo,
        };
        try {
            const response = await axios.post('http://localhost:8080/cars/create', carListingRequest, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.status === 201) {
                alert('Car listing created successfully');
                router.push('lisa_pildid');
            } else {
                alert('Failed to create car listing');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the car listing');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="">
            <div className="h-[60px] w-full text-[14px] flex justify-start items-center mt-4 mb-4">
                <span className="flex items-center ml-[50px]">
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-lime-600 text-white font-bold mr-2">
                        1
                    </span>
                    <span>Sõiduki sisestamine</span>
                </span>
                <span className="flex items-center ml-16">
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        2
                    </span>
                    <span>Piltide lisamine</span>
                </span>
                <span className="flex items-center ml-16">
                    <span className="flex items-center justify-center w-[25px] h-[25px] rounded-full bg-gray-200 text-white font-bold mr-2">
                        3
                    </span>
                    <span>Teenuste tellimine</span>
                </span>
            </div>

            <ContactDetails formData={carDetails} handleChange={handleChange} />
            <VehicleDetails formData={carDetails} handleChange={handleChange} />
            <h1 className="text-xl mb-2">Varustus</h1>
            <SafetyEquipment formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'safetyAndSecurity')} />
            <LightsDetails formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'lights')} />
            <Tires formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'tiresAndWheels')} />
            <SteeringFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'steering')} />
            <AudioVideoCommunicationFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'audioVideoCommunication')} />
            <InteriorFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'interiorFeatures')} />
            <SeatsFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'seats')} />
            <ComfortFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'comfortFeatures')} />
            <SportFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'sportFeatures')} />
            <AdditionalFeatures formData={carExtraInfo} handleChange={(e) => handleExtraInfoChange(e, 'additionalFeatures')} />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
};

export default CarDetailsForm;