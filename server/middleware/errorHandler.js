const logger = require('../lib/logger')

function errorHandler () {
  return function (err, req, res, next) {
    logger.error(err)

    const error = { name: err.name, message: err.message, stack: err.stack }
    for (const prop in err) error[prop] = err[prop]

    return res.status(err.status || 500).json({ error })
  }
}

module.exports = errorHandler
