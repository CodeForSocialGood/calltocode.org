const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const connectToDatabase = require('./database')
const routes = require('./routes')

const app = express()
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use(bodyParser.json())
app.use(routes)
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), async () => {
  try {
    await connectToDatabase()
    console.log('Database connected')
  } catch (error) {
    console.error('Database connection error', error)
  }
  console.log(`App listening on port ${app.get('port')}`)
})

module.exports = app
