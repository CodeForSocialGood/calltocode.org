import app from './app'
import _database from './database'
import logger from './lib/logger'
import { appConfig, databaseConfig } from './config'

const database = _database._init(databaseConfig.url)

app.listen(appConfig.port, runServer)

async function runServer () {
  logger.log(`App listening on port ${this.address().port}`)

  try {
    await database.connect()
    logger.log('Database connected')
  } catch (error) {
    logger.error('Database connection error', error)
  }
}

export default app
