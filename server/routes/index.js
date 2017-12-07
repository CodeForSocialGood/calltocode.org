const router = require('express').Router()
const indexController = require('./controllers/indexController')._init()

router.use(logger)
router.use('/api', require('./api'))
router.get('*', indexController.getIndexPage.bind(indexController))

function logger (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
}

module.exports = router
