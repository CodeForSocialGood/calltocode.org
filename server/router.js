const express = require('express')
const RouterService = require('./services/RouterService')

const router = express.Router()
router.use(function routeLog (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
})

const routerService = new RouterService()
router.get('/', routerService.getIndex.bind(routerService))
router.post('/email', routerService.postEmail.bind(routerService))
router.get('*', routerService.getIndex.bind(routerService))

module.exports = router
