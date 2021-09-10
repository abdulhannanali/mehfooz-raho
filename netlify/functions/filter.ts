import { Handler } from '@netlify/functions'
import { getFilterData } from '@abdulhannanali/vaccination-centres-parser'
import { uniq } from 'ramda'
import { friendlyNameConverter } from './lib/nameResolver'

const filterData = getSortedFilterData()

export const handler : Handler = async function () {
    return {
        statusCode: 200,
        body: JSON.stringify(filterData)
    }
}


function getSortedFilterData () {
    const filterData = getFilterData()

    return {
        districts: uniq(sortByLocaleComparison(filterData.districts).map(friendlyNameConverter)),
        designations: uniq(sortByLocaleComparison(filterData.designations).map(friendlyNameConverter)),
        tehsils: uniq(sortByLocaleComparison(filterData.tehsils).map(friendlyNameConverter)),
        provinces: uniq(sortByLocaleComparison(filterData.provinces).map(friendlyNameConverter))
    }
}

function sortByLocaleComparison (array: string[]) {
    return array.sort((a, b) => a.localeCompare(b)).filter(b => {
        if (b) {
            return b.match(/[0-9]+/i) === null
        }

        return false
    })
}