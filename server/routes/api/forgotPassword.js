const router = require('express').Router()

const auth = require('../../middleware/auth')
const forgotPasswordController = require('../controllers/forgotPasswordController')._init()

router.route('/')
  .post(auth.optional, forgotPasswordController.sendVerificationCodeEmail)

module.exports = router
