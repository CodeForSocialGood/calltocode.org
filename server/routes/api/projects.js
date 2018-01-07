const router = require('express').Router()

const auth = require('../../middleware/auth')
const projectsController = require('../controllers/projectsController')._init()

router.route('/')
  .get(auth.optional, projectsController.getProjects)

router.route('/:project')
  .get(auth.optional, projectsController.getProject)

router.route('/createproject')
  .post(projectsController.createProject)

module.exports = router
