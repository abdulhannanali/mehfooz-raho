import { Handler } from '@netlify/functions'
import { getFilterData } from '@abdulhannanali/vaccination-centres-parser'
import { sortBy } from 'ramda'

const filterData = getSortedFilterData()

export const handler : Handler = async function () {
    return {
        statusCode: 200,
        body: JSON.stringify(filterData),
        headers: {
            'Access-Control-Allow-Origin': "*"
        }
    }
}


function getSortedFilterData () {
    const filterData = getFilterData()

    return {
        districts: sortByLocaleComparison(filterData.districts),
        designations: sortByLocaleComparison(filterData.designations),
        tehsils: sortByLocaleComparison(filterData.tehsils),
        provinces: sortByLocaleComparison(filterData.provinces)
    }
}

function sortByLocaleComparison (array: string[]) {
    return array.sort((a, b) => a.localeCompare(b))
}