import { getDistance } from 'geolib'
import { Handler } from "@netlify/functions";
import pagination from './lib/pagination'; 
import { getAllVaccinationCentres, Place, VaccinationCentre } from '@abdulhannanali/vaccination-centres-parser'
import { GeolibInputCoordinates } from 'geolib/es/types';



export const handler : Handler = async (event, context) => {
    const latitude = event.queryStringParameters['lat']
    const longitude = event.queryStringParameters['lng']

    if (!latitude || !longitude) {
        throw new Error('`latitude` or `longitude` is missing')
    }

    const location = parseLocation(latitude, longitude)
    const sortedVaccinationCentres = sortVaccinationCentresByNearest(location)

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(pagination("1", sortedVaccinationCentres))
    }
}

function sortVaccinationCentresByNearest (location: GeolibInputCoordinates) {
    return getAllVaccinationCentres()
    .filter((vaccinationCentre) => {
        return getLocationFromVaccinationCentre(vaccinationCentre) !== undefined
    })
    .sort((aVaccinationCentre, bVaccinationCentre) => {
        const locationA = getLocationFromVaccinationCentre(aVaccinationCentre)
        const locationB = getLocationFromVaccinationCentre(bVaccinationCentre)
        
        return getDistance(locationA, location) - getDistance(locationB, location)
    })
}


function getLocationFromVaccinationCentre (vaccinationCentre: VaccinationCentre) {
    return vaccinationCentre.googlePlacesResponse[0]?.geometry.location
}


function parseLocation (latitude: string, longitude: string): GeolibInputCoordinates {
    return {
        latitude,
        longitude
    }
}
