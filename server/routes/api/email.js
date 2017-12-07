const router = require('express').Router()

const auth = require('../auth')
const emailController = require('../controllers/emailController')._init()

router.post('/', auth.required, emailController.sendToOrg.bind(emailController))

module.exports = router
