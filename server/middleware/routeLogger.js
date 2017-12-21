const logger = require('../logger')

function routeLogger (req, res, next) {
  logger.log(`${req.method} ${req.originalUrl} on ${new Date()}`)
  next()
}

module.exports = routeLogger
