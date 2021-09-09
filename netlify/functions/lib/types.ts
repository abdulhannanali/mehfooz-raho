import { ObjectId } from "mongodb";

export interface StatValue {
    total: string;
    last24Hours?: string;
}

export interface Statistics {
    source: 'ncoc.gov.pk' | 'covid.gov.pk';
    firstDose?: StatValue;
    fullyVaccinated?: StatValue;
    totalDosesAdministered?: StatValue;
    confirmedCases?: StatValue;
    criticalCases?: StatValue;
    deaths?: StatValue;
    recoveredCases?: StatValue;
    totalTests?: StatValue;
    createdAt: Date;
    updatedAt: Date;
}