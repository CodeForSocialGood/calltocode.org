const router = require('express').Router()

router.use('/email', require('./email'))
router.use('/projects', require('./projects'))
router.use('/users', require('./users'))
router.use('/forgot-password', require('./forgotPassword'))

module.exports = router
