import dotenv from  'dotenv'
import { resolve } from 'path/posix'

if (!process.env.NODE_ENV) {
    dotenv.config({ path: resolve(__dirname, '../.env') })
}