const express = require('express')
const bodyParser = require('body-parser')

const { appConfig, databaseConfig } = require('./config')
const database = require('./database')._init(databaseConfig.url)
const errorHandler = require('./middleware/errorHandler')
const logger = require('./logger')

const app = express()

app.use(express.static(appConfig.clientDistDir))
app.use(bodyParser.json())
app.use('/', require('./routes'))
app.use(errorHandler())

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
