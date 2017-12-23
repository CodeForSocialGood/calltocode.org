const router = require('express').Router()

const auth = require('../../middleware/auth')
const emailController = require('../controllers/emailController')._init()

router.route('/')
  .post(auth.required, emailController.sendToOrg)

module.exports = router
