import { Handler } from '@netlify/functions'
import { getAllVaccinationCities } from '@abdulhannanali/vaccination-centres-parser'
import pagination from './lib/pagination'
import { jsonResponse } from './lib/response'


interface FilterCriteria {
    district?: string;
    province?: string;
    tehsil?: string;
    page?: string
}

const allCities = getAllVaccinationCities()

export const handler: Handler = async function (event, context) {
    return jsonResponse(200, allCities)
}
