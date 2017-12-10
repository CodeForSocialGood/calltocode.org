const router = require('express').Router()

router.use('/email', require('./email'))
router.use('/projects', require('./projects'))
router.use('/user', require('./user'))
router.use('/users', require('./users'))

module.exports = router
