// Temporary server since supertest needs a server that doesn't call app.listen()
const express = require('express')
const bodyParser = require('body-parser')

const { appConfig } = require('../config')

const app = express()

app.use(express.static(appConfig.clientDistDir))
app.use(bodyParser.json())
app.use('/', require('../routes'))

module.exports = app
