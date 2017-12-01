const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const router = require('./router')
const Database = require('./database')

const clientDistDir = process.env.NODE_ENV === 'dev'
  ? path.join(__dirname, '..', 'client', 'dist')
  : path.join(__dirname, 'client')

let databaseUrl
switch (process.env.NODE_ENV) {
  case 'prod': databaseUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds117495.mlab.com:17495/c2c`; break
  case 'test': databaseUrl = 'mongodb://admin@db:27017/admin'; break
  default: databaseUrl = `mongodb://admin@${process.env.DB_URL}:27017/admin`
}

const app = express()
app.use(express.static(clientDistDir))
app.use(bodyParser.json())
app.use('/', router)
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), run)

async function run () {
  try {
    const database = new Database(databaseUrl)
    await database.connect()
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection error', error)
  }
  console.log(`App listening on port ${app.get('port')}`)
}

module.exports = app
