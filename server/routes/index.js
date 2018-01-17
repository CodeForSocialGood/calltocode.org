const router = require('express').Router()

const indexController = require('./controllers/indexController')._init()

router.use('/api', require('./api'))
router.get('*', indexController.getIndexPage.bind(indexController))

module.exports = router
