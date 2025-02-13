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
    discountPrice: boolean;
    exportPrice: boolean;
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
}
export interface CarExtraInfoDTO {
    safetyAndSecurity: Record<string, boolean>;
    lights: Record<string, boolean>;
    tiresAndWheels: Record<string, boolean>;
    steering: Record<string, boolean>;
    seats: Record<string, boolean>;
    comfortFeatures: Record<string, boolean>;
    additionalFeatures: Record<string, boolean>;
    sportFeatures: Record<string, boolean>;
    audioVideoCommunication: Record<string, boolean>;
    interiorFeatures: Record<string, boolean>;

}
export interface UsersDTO {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    carIds: string;

}

