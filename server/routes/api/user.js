const router = require('express').Router()

const auth = require('../auth')
const userController = require('../controllers/userController')._init()

router.route('/')
  .get(auth.required, userController.getCurrent)
  .put(auth.required, userController.putCurrent)

module.exports = router
