const express = require('express')
const path = require('path')
const router = require('./router')

const app = express()
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.use('/', router)
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`)
})

module.exports = app
