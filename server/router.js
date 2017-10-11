const express = require('express')
const emailController = require('./controllers/emailController')._init()
const signupController = require('./controllers/signupController')._init()
const indexController = require('./controllers/indexController')._init()

const router = express.Router()

router.use(function routeLog (req, res, next) {
  console.log(`${req.originalUrl} on ${new Date()}`)
  next()
})

router.post('/email', emailController.sendEmailToOrganization.bind(emailController))
router.post('/signup', signupController.signupNewUser.bind(signupController))
router.get('/', indexController.getIndexPage.bind(indexController))
router.get('*', indexController.getIndexPage.bind(indexController))

module.exports = router
