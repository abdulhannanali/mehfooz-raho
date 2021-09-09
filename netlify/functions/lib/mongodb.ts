import { Filter, MongoClient, ObjectId } from 'mongodb'
import { Statistics } from './types'

const {
    MONGODB_URI,
    MONGO_DB_NAME
} = process.env

const client = new MongoClient(MONGODB_URI)
const db = client.db()

export const statisticsCollection = db
    .collection<Statistics>('statistics')



export default client