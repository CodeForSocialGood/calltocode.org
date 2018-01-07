const app = require('./app')
const { appConfig, databaseConfig } = require('./config')
const database = require('./database')._init(databaseConfig.url)
const logger = require('./logger')

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

module.exports = app
