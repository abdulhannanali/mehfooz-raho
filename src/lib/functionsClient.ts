import axios from 'axios'
import { 
    FilterData, 
    VaccinationCentre, 
    VaccinationCity } from '@abdulhannanali/vaccination-centres-parser/dist/src'
import { VaccinationCentresFilter } from '../features/vaccinationCentres/slice/types'


export interface PaginationResponse<T> {
    currentPage: number;
    totalPages: number;
    currentStartIdx: number;
    currentEndIdx: number;
    totalElements: number;
    elements: T[]
}

const client = axios.create({
    baseURL: process.env.NODE_ENV ? 'http://localhost:38791/' : '/.functions/',
})


export async function getVaccinationCentres (filter: VaccinationCentresFilter) {
    const response = await client.get('/centres', { 
        params: <VaccinationCentresFilter>{
            page: filter.page || '1',
            district: filter.district || '',
            tehsil: filter.tehsil || '',
            name: filter.filterText,
            province: filter.province,
        },
    })

    return response.data as PaginationResponse<VaccinationCentre>
}


export async function getVaccinationCities () {
    const response = await client.get('/cities')
    return response.data as VaccinationCity[]
}

export async function getFilterData () {
    const response = await client.get('/filter')
    return response.data as FilterData
}


/**
 * Stub for now
 */
async function getStatistics  () {
    // const response = await client.get('/statistics', {
    //     params: {

    //     }
    // })

    // return response.data as Statistic
}

