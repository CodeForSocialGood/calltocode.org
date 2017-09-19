const express = require('express')
const router = require('./router')

const app = express()
app.use('/', router)
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}`)
})
