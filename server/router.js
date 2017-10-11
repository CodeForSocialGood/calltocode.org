const express = require('express')
const emailController = require('./controllers/emailController')
const signupController = require('./controllers/signupController')
const indexController = require('./controllers/indexController')

const router = express.Router()

router.use(function routeLog (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
})

router.post('/email', emailController.sendEmailToOrganization)
router.post('/signup', signupController.signupNewUser)
router.get('/', indexController.getIndexPage)
router.get('*', indexController.getIndexPage)

module.exports = router
