import { Handler } from '@netlify/functions'
import { getAllVaccinationCities } from '@abdulhannanali/vaccination-centres-parser'
import pagination from './lib/pagination'


interface FilterCriteria {
    district?: string;
    province?: string;
    tehsil?: string;
    page?: string
}

export const handler: Handler = async function (event, context) {
    return {
        body: JSON.stringify(getAllVaccinationCities()),
        statusCode: 200
    }
}

function getFilteredVaccinationCities (filterCriteria: FilterCriteria) {
    const filteredCities = (
        getAllVaccinationCities()
            .filter(vaccinationCity => {
                return (
                    (!filterCriteria.district || vaccinationCity.district.match(new RegExp(filterCriteria.district, 'i'))) &&
                    (!filterCriteria.province || vaccinationCity.province.match(new RegExp(filterCriteria.province, 'i'))) &&
                    (!filterCriteria.tehsil || vaccinationCity.tehsil.match(new RegExp(filterCriteria.tehsil, 'i')))
                )    
            })           
    )


    return filteredCities
}