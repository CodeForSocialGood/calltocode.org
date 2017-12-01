const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const connectToDatabase = require('./database')
const { serverPort } = require('./config')

const app = express()

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use(bodyParser.json())

app.use(require('./routes'))

app.set('port', serverPort)

app.listen(serverPort, async () => {
  try {
    await connectToDatabase()
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection error', error)
  }
  console.log(`App listening on port ${serverPort}`)
})

module.exports = app
