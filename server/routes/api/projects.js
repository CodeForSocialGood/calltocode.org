import express from 'express'

import auth from '../../lib/middleware/auth'
import _projects from '../controllers/projects'

const router = express.Router()
const projects = _projects._init()

router.route('/')
  .get(auth.optional, projects.getProjects)
  // TODO: below, this should be `auth.required`. client api first needs to use
  // `apiRequest` with `apiOptionsFromState` in order to pass authentication.
  .post(auth.optional, projects.createProject)

router.route('/:project')
  .get(auth.optional, projects.getProject)

export default router
