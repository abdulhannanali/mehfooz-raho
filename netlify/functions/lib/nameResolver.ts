import { capitalCase } from 'capital-case'

/**
 * Converts Spreadsheet parsed name to a friendly name
 */
export function friendlyNameConverter (str: string) : string {
    return capitalCase(str ? str.toLowerCase() : "")
}
