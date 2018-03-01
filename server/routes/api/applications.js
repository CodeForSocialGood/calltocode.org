import expressPromiseRouter from 'express-promise-router'

import auth from '../../lib/middleware/auth'
import _applications from '../controllers/applications'

const router = expressPromiseRouter()
const applications = _applications._init()

router.route('/')
  .get(auth.required, applications.getApplications)
  .post(auth.required, applications.createApplication)

router.route('/notifications')
  .get(auth.required, applications.getNotifications)

router.route('/:applicationId/accept')
  .post(auth.required, applications.acceptApplication)

router.route('/:applicationId/reject')
  .post(auth.required, applications.rejectApplication)

router.route('/:applicationId/markAsSeen')
  .post(auth.required, applications.markAsSeenApplication)

router.param('applicationId', applications.applicationById)

export default router
