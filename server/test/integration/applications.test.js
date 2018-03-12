import test from 'ava'
import request from 'supertest'

import { before, beforeEach, afterEach, after } from '../util'

test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)
test.after.always(after)

test.serial('application routes require Authorization', async t => {
  const { app } = t.context
  const res1 = await request(app).get('/api/applications')
  const res2 = await request(app).post('/api/applications')

  t.is(res1.status, 401)
  t.true(typeof res1.body === 'object')
  t.is(res1.body.error.name, 'UnauthorizedError')

  t.is(res2.status, 401)
  t.true(typeof res2.body === 'object')
  t.is(res2.body.error.name, 'UnauthorizedError')
})

test.serial('getApplications, all', async t => {
  const { app, applications, contactToken } = t.context
  const res = await request(app)
    .get('/api/applications')
    .set('Authorization', `Token ${contactToken}`)

  t.is(res.status, 200)
  t.is(res.body.length, applications.length)
})

test.serial('getApplications, volunteer query', async t => {
  const { app, volunteer, volunteerToken } = t.context
  const res = await request(app)
    .get('/api/applications')
    .set('Authorization', `Token ${volunteerToken}`)
    .query({ volunteer: volunteer._id })

  t.is(res.status, 200)
  t.is(res.body.length, volunteer.applications.length)

  for (const application of res.body) {
    const inList = volunteer.applications.some(a => a._id === application._id)
    t.true(inList)
  }
})

test.serial('getApplications, project query', async t => {
  const { app, projects, contactToken } = t.context
  const projectWithApplications = projects.find(project => project.applications.length > 0)
  const res = await request(app)
    .get('/api/applications')
    .set('Authorization', `Token ${contactToken}`)
    .query({ project: projectWithApplications._id })

  t.is(res.status, 200)

  for (const application of res.body) {
    t.is(application.project.id, projectWithApplications._id)
    t.is(application.project.name, projectWithApplications.name)
  }
})

test.serial('createApplication', async t => {
  const { app, projects: [project], volunteer, volunteerToken } = t.context
  const newApplication = {
    volunteer,
    project
  }
  const res = await request(app)
    .post('/api/applications')
    .set('Authorization', `Token ${volunteerToken}`)
    .send(newApplication)

  t.is(res.status, 200)
  t.is(res.body.volunteer, volunteer._id)
  t.is(res.body.project, newApplication.project._id)
  t.is(res.body.status, 'pending')
})

test.serial('getNotifications', async t => {
  const { app, applications, projects, contact, contactToken } = t.context
  const contactOrgProjects = projects
    .filter(project => project.organization === contact.organization)
  const contactOrgApplicationIds = contactOrgProjects
    .reduce((apps, project) => apps.concat(project.applications), [])
  const contactOrgApplications = applications
    .filter(app => contactOrgApplicationIds.includes(app._id) && !app.seenAt)

  const res = await request(app)
    .get('/api/applications/notifications')
    .set('Authorization', `Token ${contactToken}`)

  t.is(res.status, 200)
  t.is(res.body.length, contactOrgApplications.length)

  for (const application of res.body) {
    const inList = contactOrgApplications.some(a => a._id === application.id)
    t.true(inList)
  }
})

test.serial('acceptApplication', async t => {
  const { app, applications, contactToken } = t.context
  const pendingApplication = applications.find(app => app.status === 'pending')
  const res = await request(app)
    .post(`/api/applications/${pendingApplication._id}/accept`)
    .set('Authorization', `Token ${contactToken}`)

  t.is(res.status, 200)
  t.is(res.body.id, pendingApplication._id)
  t.is(res.body.status, 'accepted')
})

test.serial('rejectApplication', async t => {
  const { app, applications, contactToken } = t.context
  const pendingApplication = applications.find(app => app.status === 'pending')
  const res = await request(app)
    .post(`/api/applications/${pendingApplication._id}/reject`)
    .set('Authorization', `Token ${contactToken}`)

  t.is(res.status, 200)
  t.is(res.body.id, pendingApplication._id)
  t.is(res.body.status, 'rejected')
})
