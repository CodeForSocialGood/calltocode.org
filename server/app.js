const express = require('express')
const bodyParser = require('body-parser')

const { appConfig } = require('./config')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(express.static(appConfig.clientDistDir))
app.use(bodyParser.json())
app.use('/', require('./routes'))
app.use(errorHandler())

module.exports = app
