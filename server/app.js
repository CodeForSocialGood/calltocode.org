import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'

import { appConfig } from './config'
import errorHandler from './lib/middleware/errorHandler'
import routes from './routes'

const app = express()

app.use(express.static(appConfig.publicDir))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/', routes)
app.use(errorHandler())

export default app
