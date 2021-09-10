import { Handler } from "@netlify/functions";
import { getAllVaccinationCentres } from '@abdulhannanali/vaccination-centres-parser';
import pagination from "./lib/pagination";

interface FilterCriteria {
    id?: string
    district?: string;
    tehsil?: string;
    province?: string;
    name?: string;
    page?: string;
}

export const handler : Handler = async function centres (event) {
    const filter : FilterCriteria = {
        id: event.queryStringParameters['id'],
        district: event.queryStringParameters['district'],
        tehsil: event.queryStringParameters['teshil'],
        province: event.queryStringParameters['province'],
        name: event.queryStringParameters['name'],
        page: event.queryStringParameters['page'],
    } 


    return {
        statusCode: 200,
        body: JSON.stringify(pagination(filter.page, filterCentres(filter))),
    }

}

function filterCentres ({ district, province, tehsil, name, id }: FilterCriteria) {
    let vaccinationCentres = getAllVaccinationCentres()
    
    if (district || province || tehsil || name || id) {
        vaccinationCentres = vaccinationCentres.filter(({ baseVaccinationCentre, id: oId }) => (
            (!id || isMatching(id, oId)) &&
            (!district || isMatching(district, baseVaccinationCentre.district)) &&
            (!province || isMatching(province, baseVaccinationCentre.province)) &&
            (!tehsil || isMatching(tehsil, baseVaccinationCentre.tehsil)) &&
            (!name || 
                (
                    isMatching(name, id) ||
                    isMatching(name, baseVaccinationCentre.name) || 
                    isMatching(name, baseVaccinationCentre.district) || 
                    isMatching(name, baseVaccinationCentre.tehsil) ||
                    isMatching(name, baseVaccinationCentre.province)
                )
            )
        ))
    }

    return vaccinationCentres
}



function isMatching (arg: string | undefined, str: string | undefined): boolean {
    if (typeof arg === 'string' && typeof str === 'string') {
        return str.toLowerCase().indexOf(arg.toLowerCase()) !== -1
    }

    return false
}