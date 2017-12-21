const http = require('http')
const https = require('https')

const app = require('./app')
const { appConfig, databaseConfig } = require('./config')
const database = require('./database')._init(databaseConfig.url)
const logger = require('./logger')

getServer().listen(appConfig.port, runServer)

function getServer () {
  switch (process.env.NODE_ENV) {
    case 'prod':
    case 'test': return https.createServer(appConfig.httpsOptions, app)
    default: return http.createServer(app)
  }
}

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
