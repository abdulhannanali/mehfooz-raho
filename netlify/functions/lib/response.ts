import { HandlerResponse } from '@netlify/functions'


const isNetlify = 'NETLIFY' in process.env
const defaultHeaders = isNetlify ?
    {} :
    {
        'Access-Control-Allow-Origin': '*'
    }


export function jsonResponse(statusCode: number, body: object): HandlerResponse {
    return {
        body: JSON.stringify(body),
        statusCode,
        headers: defaultHeaders
    }
}