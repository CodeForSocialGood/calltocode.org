const app = require('./app')
const { appConfig, databaseConfig } = require('./config')
const database = require('./database')._init(databaseConfig.url)
const logger = require('./logger')

app.listen(appConfig.port, run)

async function run () {
  logger.log(`App listening on port ${appConfig.port}`)

  try {
    await database.connect()
    logger.log('Database connected')
  } catch (error) {
    logger.error('Database connection error', error)
  }
}

module.exports = app
