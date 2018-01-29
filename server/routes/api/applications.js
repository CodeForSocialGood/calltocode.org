import expressPromiseRouter from 'express-promise-router'

import auth from '../../lib/middleware/auth'
import _applications from '../controllers/applications'

const router = expressPromiseRouter()
const applications = _applications._init()

router.route('/')
  .get(auth.required, applications.getApplications)
  .post(auth.required, applications.createApplication)

export default router
