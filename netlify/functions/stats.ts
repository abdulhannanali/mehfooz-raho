import { Handler } from '@netlify/functions'
import { getStatistics } from './lib/statistics'
import './lib/dotenv'

export const handler : Handler = async (event, context) => {
    return {
        body: JSON.stringify(await getStatistics()),
        statusCode: 200,
    }
}

