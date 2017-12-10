const express = require('express')
const bodyParser = require('body-parser')

const {appConfig, databaseConfig} = require('./config')
const database = require('./database')._init(databaseConfig.url)

const app = express()
app.use(express.static(appConfig.clientDistDir))
app.use(bodyParser.json())
app.use('/', require('./routes'))
app.listen(appConfig.port, run)

async function run () {
  try {
    await database.connect()
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection error', error)
  }
  console.log(`App listening on port ${appConfig.port}`)
}

module.exports = app
