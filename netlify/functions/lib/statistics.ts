import { crawlNcocForStatistics } from './ncocCrawler'
import client, { statisticsCollection } from './mongodb'

export async function getStatistics () {
    await client.connect()

    const mongoStats = await statisticsCollection.findOne({
        createdAt: {
            $gte: new Date(Date.now() -  (1 * 60 * 60 * 1000))
        }
    })

    if (!mongoStats) {
        const stats = await crawlNcocForStatistics()
        await statisticsCollection.insertOne(stats)
        client.close()
        return stats
    }

    client.close()
    return mongoStats
}