import expressPromiseRouter from 'express-promise-router'

import auth from '../../lib/middleware/auth'
import _projects from '../controllers/projects'

const router = expressPromiseRouter()
const projects = _projects._init()

router.route('/')
  .get(auth.optional, projects.getProjects)
  .post(auth.optional, projects.createProject)

router.route('/:projectId')
  .get(auth.optional, projects.getProject)
  .put(auth.optional, projects.putProject)

router.param('projectId', projects.projectById)

export default router
