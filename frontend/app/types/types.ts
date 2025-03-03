export interface CarDetailsDTO {
    vehicleType: string;
    bodyType: string;
    bodyTypeDetail: string;
    model: string;
    make: string;
    modelGeneration: string;
    modelTrim: string;
    firstRegistrationDate: string;
    price: number;
    includesRegistrationFee: boolean;
    odometerReading: number;
    hasServiceBook: boolean;
    vinCode: string;
    registrationNumber: string;
    transmission: string;
    driveType: string;
    engineCapacityLiters: number;
    engineCapacityCubicCentimeters: number;
    engineConfiguration: string;
    engineDetails: string;
    enginePowerKW: number;
    enginePowerHP: number;
    fuelType: string;
    fuelTankCapacity: number;
    fuelConsumptionHighway: number;
    fuelConsumptionCity: number;
    fuelConsumptionCombined: number;
    fuelConsumptionStandard: string;
    co2Emissions: number;
    seatingCapacity: number;
    numberOfDoors: number;
    hasWarranty: boolean;
    accidentDamaged: boolean;
    color: string;
    metallicColor: boolean;
    colorDetail: string;
    curbWeight: number;
    grossWeight: number;
    payloadCapacity: number;
    brakedTrailerWeight: number;
    unbrakedTrailerWeight: number;
    wheelbase: number;
    length: number;
    width: number;
    height: number;
    numberOfAxles: number;
    acceleration0To100: number;
    topSpeed: number;
    locationCountry: string;
    locationCounty: string;
    importedFromCountry: string;
    registeredInCountry: boolean;
    inspectionValidUntil: string;
    reserved: boolean;
    reservationUntilDate: string;
    exchangePossible: boolean;
    exchangeDetails: string;
    description: string;
    [key: string]: string | number | boolean | undefined; // Index signature
}

export interface CarExtraInfoDTO {
    safetyAndSecurity: SafetyAndSecurity;
    lights: Lights;
    tiresAndWheels: TiresAndWheels;
    steering: Steering;
    seats: Seats;
    comfortFeatures: Comfort;
    additional: additionalFeatures;
    sportFeatures: Sport;
    audioVideoCommunication: AudioVideoCommunication;
    interiorFeatures: Interior;
}
export interface UserDTO {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    newsletter: boolean;
    active: boolean;
}
export interface Lights {
    [key: string]: string | boolean;
    xenon: boolean;
    laser: boolean;
    led: boolean;
    esituledePesurid: boolean;
    kurvituled: boolean;
    päevasõidutuledeAutomaatneLülitus: boolean;
    kaugtuledeÜmberlülitamiseAssistent: boolean;
    udutuled: boolean;
    tuledeKorrektor: boolean;
    lisatuled: boolean;
}

export interface SafetyAndSecurity {
    [key: string]: string | boolean;
    roolivoimendi: boolean;
    kesklukustus: boolean;
    absPidurid: boolean;
    elektroonilineSeisupidur: boolean;
    turvapadi: boolean;
    turvakardinad: boolean;
    korvalistujaTurvapadjaValjalulitamiseVõimalus: boolean;
    juhiVäsimuseTuvastamiseSüsteem: boolean;
    signalisatsioon: boolean;
    immobilisaator: boolean;
    stabiilsuskontroll: boolean;
    pidurdusjoukontroll: boolean;
    veojoukontroll: boolean;
    soiduradaHoidmiseAbisüsteem: boolean;
    soiduradaVahetamiseAbisüsteem: boolean;
    liiklusmärkideTuvastusJaKuvamine: boolean;
    oiseNagemiseAssistent: boolean;
    pimenurgaHoiatus: boolean;
    kokkuporgetEnnetavPidurisüsteem: boolean;
    jalakäijaOhutusfunktsioonigaKapott: boolean;
    automaatpidurdussüsteem: boolean;
    lisapidurituli: boolean;
    vihmasensor: boolean;
    isofixLasteistmeKinnitus: boolean;
    integreeritudLapseiste: boolean;
    turvavöödeEelpingutidEsiistmetel: boolean;
    automaatnePaigalseismiseFunktsioon: boolean;
    mägipidur: boolean;
}

export interface TiresAndWheels {
    [key: string]: string | boolean;
    suverehvid: boolean;
    talverehvid: boolean;
    valuveljed: boolean;
    ilukilbid: boolean;
    tagavararatas: boolean;
    rehvirõhuKontrollsüsteem: boolean;
    autogaKaasaSuverehvid: boolean;
    autogaKaasaTalverehvid: boolean;
    autogaKaasaValuveljed: boolean;
    autogaKaasaIlukilbid: boolean;
}

export interface Steering {
    [key: string]: string | boolean;
    reguleeritavRoolisammas: boolean;
    multifunktsionaalneRool: boolean;
    nahkkattegaRool: boolean;
    sportrool: boolean;
    soojendusegaRool: boolean;
    käiguvahetusRoolilt: boolean;
    parempoolneRool: boolean;
}

export interface Seats {
    [key: string]: string | boolean;
    nahkpolster: boolean;
    nahkpolsterLisainfo: string;
    poolnahkpolster: boolean;
    poolnahkpolsterLisainfo: string;
    veluurpolster: boolean;
    veluurpolsterLisainfo: string;
    tekstiilpolster: boolean;
    tekstiilpolsterLisainfo: string;
    elektriliseltReguleeritavadIstmed: boolean;
    ohugaReguleeritavIste: boolean;
    istmedReguleeritavaKorgusega: boolean;
    istmesoojendused: boolean;
    reguleeritavaKumerusegaSeljatugi: boolean;
    massaazifunktsioonigaIstmed: boolean;
    massaazifunktsioonigaIstmedLisainfo: string;
    ventileeritavadIstmed: boolean;
    kaetugiEes: boolean;
    kaetugiTaga: boolean;
    kaassoitjaIstmeSeljatugiAllaklapitav: boolean;
    tagaistmeSeljatugiAllaklapitav: boolean;
    comfortIstmed: boolean;
    sportistmed: boolean;
}

export interface Comfort {
    [key: string]: string | boolean;
    kliimaseade: boolean;
    elektrilisedValispeeglid: boolean;
    virtuaalsedValispeeglid: boolean;
    virtuaalneSisepeegel: boolean;
    elektrilisedAkendeTostukid: boolean;
    toonitudKlaasid: boolean;
    katuseluuk: boolean;
    katuseluukLisainfo: string;
    panoraamkatus: boolean;
    usteServosulgurid: boolean;
    votmetaAvamine: boolean;
    votmetaKaivitus: boolean;
    pusikiiruseHoidja: boolean;
    pakiruumiAvamineElektriliselt: boolean;
    peeglidPaikesesirmides: boolean;
    rulookardinTagaaknal: boolean;
    rulookardinadUstel: boolean;
    mootoriEelsoojendus: boolean;
    mootoriEelsoojendusLisainfo: string;
    salongiEelsoojendus: boolean;
    salongiEelsoojendusLisainfo: string;
    salongiLisasoojendus: boolean;
    integreeritudVaravapult: boolean;
    automaatseltTumenevadPeeglid: boolean;
    eraldiKliimaseadeTagaistmetele: boolean;
    usteSisevalgustus: boolean;
    kohtvalgustid: boolean;
    parkimisandurid: boolean;
    parkimiskaamera: boolean;
    automaatseParkimiseFunktsioon: boolean;
    comingLeavingHomeFunktsioon: boolean;
    digitaalneNaidikutepaneel: boolean;
    infoKuvamineEsiklaasile: boolean;
    pakiruumiLiugpõrand: boolean;
    elektrilisedLiuguksed: boolean;
    telefoniJuhtmevabaLaadimine: boolean;
}

export interface additionalFeatures {
    [key: string]: string | boolean;
    reguleeritavVedrustus: boolean;
    ohkvedrustus: boolean;
    startStoppSusteem: boolean;
    pistikupesad12v: boolean;
    katusereelingud: boolean;
    katusereelingudLisainfo: string;
    suusakott: boolean;
    rehviparanduskomplekt: boolean;
    jahutusegaKindalaegas: boolean;
    valistemperatuuriNaidik: boolean;
    topeltklaasid: boolean;
    topeltklaasidLisainfo: string;
    elektriliseSoojendusegaEsiklaas: boolean;
    tagaklaasiSoojendus: boolean;
    aknapesupihustiteSulatus: boolean;
    pagasikate: boolean;
    pagasiVorkPakiruumis: boolean;
    salongiJaPakiruumiEraldusvork: boolean;
    kaubakinnituseKonksud: boolean;
    tagaklaasiPuhasti: boolean;
    paigaldatudTulekustuti: boolean;
    veokonks: boolean;
    haagiseStabiliseerimissusteem: boolean;
    reisiarvesti: boolean;
    esiJaTagaratastePorikummid: boolean;
    invavarustus: boolean;
    neljarattaPooramine: boolean;
    arvelKuiN1Kaubik: boolean;
    muudLisad: string;
}

export interface AudioVideoCommunication {
    [key: string]: string | boolean;
    stereo: boolean;
    stereoLisainfo: string;
    helivoimendi: boolean;
    helivoimendiLisainfo: string;
    kolarid: boolean;
    kolaridLisainfo: string;
    subwoofer: boolean;
    subwooferLisainfo: string;
    cdBox: boolean;
    cdBoxLisainfo: string;
    appleCarPlay: boolean;
    androidAuto: boolean;
    dvd: boolean;
    elektrilineAntenn: boolean;
    ekraan: boolean;
    ekraanLisainfo: string;
    navigatsiooniseade: boolean;
    autokompuuter: boolean;
    autotelefon: boolean;
    autotelefonLisainfo: string;
    kaedVabadSusteem: boolean;
    kaedVabadSusteemLisainfo: string;
    gsmAntenn: boolean;
}

export interface Interior {
    [key: string]: string | boolean;
    iluliistudSalongis: boolean;
    iluliistudSalongisLisainfo: string;
    taskudEsiistmeteSeljatugedes: boolean;
    jalamatid: boolean;
    sahtlidEsiistmeteAll: boolean;
    pagasiruumiMatt: boolean;
    topsihoidjad: boolean;
    nahkkattegaKaigukanginupp: boolean;
    nahkkattegaKasipidurikang: boolean;
    tumeLaepolster: boolean;
}

export interface Sport {
    [key: string]: string | boolean;
    tagaspoiler: boolean;
    esispoiler: boolean;
    spoileriring: boolean;
    sportvedrustus: boolean;
    sportsummuti: boolean;
}

