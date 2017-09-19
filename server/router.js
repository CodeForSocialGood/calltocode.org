const express = require('express')
const path = require('path')

const router = express.Router()

router.use(function routeLog (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
})

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

module.exports = router
