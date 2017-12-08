const router = require('express').Router()

const auth = require('../auth')
const projectsController = require('../controllers/projectsController')._init()

router.param('project', projectsController.preloadProject)

router.route('/')
  .get(auth.optional, projectsController.getProjects)

router.route('/:project')
  .get(auth.optional, projectsController.getProject)

module.exports = router
