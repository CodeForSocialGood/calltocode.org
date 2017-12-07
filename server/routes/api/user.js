const router = require('express').Router()

const auth = require('../auth')
const userController = require('../controllers/userController')._init()

router.get('/', auth.required, userController.getCurrent.bind(userController))

router.put('/', auth.required, userController.putCurrent.bind(userController))

module.exports = router
