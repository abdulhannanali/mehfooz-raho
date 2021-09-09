import fetch from 'node-fetch'
import cheerio from 'cheerio'
import { Statistics, StatValue } from './types' 

const SOURCE_URL = 'https://ncoc.gov.pk'
const vaccTextClass = 'vacc_text'

type UnparsedStatValue = {
    title: string;
    count: string;
    last24Hours: string;
}


export async function crawlNcocForStatistics () {
    const rawHTML = await fetchStatisticsPage()
    const $ = cheerio.load(rawHTML)

    const vaccinationStats = parseVaccinationStats($)
    const infectionStats = parseInfectionStats($)
    const allUnparsedStats = vaccinationStats.concat(infectionStats)

    return allUnparsedStats.reduce((acc, unparsed) => {
        const resolvedProp = resolveTitleToProp(unparsed.title)
        
        if (resolvedProp) {
            const statValue: StatValue = {
                total: unparsed.count,
                last24Hours: unparsed.last24Hours
            }
            
            acc[resolvedProp] = statValue
        }

        return acc
    }, {
        source: 'ncoc.gov.pk',
        createdAt: new Date(),
        updatedAt: new Date()
    } as Statistics)
}


function parseVaccinationStats ($: cheerio.Root): UnparsedStatValue[] {
    return $('.vacc_text').toArray().map(function (element, index) {
        const $element = cheerio.load(element)

        return {
            title: $element('.title').text()?.trim(),
            count: $element('.counter').text()?.trim(),
            last24Hours: $element('.last_hours').text()?.trim()
        }
    })
}

function parseInfectionStats ($: cheerio.Root): UnparsedStatValue[] {
    return $('.covid-stats').toArray().map(function (stat) {
        return {
            title: $('h5', stat).text()?.trim(),
            count: $('span', stat).text()?.trim(),
            last24Hours: $('.last-hours > b', stat).text()?.trim()
        }
    })
}


function resolveTitleToProp (str: string) {
    const propsMap = {
        firstDose: /first dose/i,
        fullyVaccinated: /fully vaccinated/i,
        totalDosesAdministered: /total doses/i,
        confirmedCases: /confirmed cases/i,
        deaths: /deaths/i,
        recoveredCases: /recovered cases/i,
        totalTests: /total tests/i
    }

    const result = Object
        .entries(propsMap)
        .find(([key, value]) => value.test(str))

    if (result) {
        return result[0]
    }
}

function fetchStatisticsPage () {
    return fetch(SOURCE_URL).then(response => response.text())
}