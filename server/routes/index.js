const router = require('express').Router()

const routeLogger = require('../middleware/routeLogger')
const indexController = require('./controllers/indexController')._init()

router.use(routeLogger)
router.use('/api', require('./api'))
router.get('*', indexController.getIndexPage.bind(indexController))

module.exports = router
