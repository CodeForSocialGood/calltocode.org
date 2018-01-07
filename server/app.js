const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { appConfig } = require('./config')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(express.static(appConfig.publicDir))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/', require('./routes'))
app.use(errorHandler())

module.exports = app
