import test from 'ava'
import request from 'supertest'

import { before, beforeEach, afterEach, after } from '../util'
import { NotFoundError } from '../../lib/errors'

test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)
test.after.always(after)

test.serial('getProjects, all', async t => {
  const { app, projects } = t.context
  const res = await request(app)
    .get('/api/projects')

  t.is(res.status, 200)
  t.is(res.body.length, projects.length)
})

test.serial('getProjects, projectsAppliedFor query', async t => {
  const { app, projects: [one, two] } = t.context
  const projectsAppliedFor = [one._id, two._id]
  const res = await request(app)
    .get('/api/projects')
    .query({ projectsAppliedFor: projectsAppliedFor.join(',') })

  t.is(res.status, 200)
  t.is(res.body.length, projectsAppliedFor.length)

  for (const project of res.body) {
    const inList = projectsAppliedFor.some(p => p._id === project._id)
    t.true(inList)
  }
})

test.serial('getProjects, origanization query', async t => {
  const { app } = t.context
  const organization = '5b165cb5202e8986f99ec5c0'
  const res = await request(app)
    .get('/api/projects')
    .query({ organization })

  t.is(res.status, 200)

  for (const project of res.body) {
    t.is(project.organization, organization)
  }
})

test.serial('createProject', async t => {
  const { app } = t.context
  const newProject = {
    name: 'Test project'
  }
  const res = await request(app)
    .post('/api/projects')
    .send({ ...newProject })

  t.is(res.status, 200)
  t.is(res.body.name, newProject.name)
})

test.serial('getProject', async t => {
  const { app, projects: [project] } = t.context
  const res = await request(app)
    .get(`/api/projects/${project._id}`)

  t.is(res.status, 200)
  t.is(res.body.organization.toString(), project.organization.toString())
  t.is(res.body.name, project.name)
  t.is(res.body.role, project.role)
  t.is(res.body.email, project.email)
})

test.serial('getProject should throw NotFoundError when no project found', async t => {
  const { app } = t.context
  const organizationId = '5b165cb5202e8986f99ec5c0'
  const res = await request(app)
    .get(`/api/projects/${organizationId}`)

  const error = new NotFoundError()

  t.is(res.status, error.status)
  t.is(res.body.error.name, error.name)
  t.is(res.body.error.message, error.message)
})

test.serial('putProject', async t => {
  const { app, projects: [one] } = t.context
  const updatedProject = {
    name: 'Updated name'
  }
  const res = await request(app)
    .put(`/api/projects/${one._id}`)
    .send({ ...updatedProject })

  t.is(res.status, 200)
  t.is(res.body.name, updatedProject.name)
})

test.serial('putProject should throw NotFoundError when no project found', async t => {
  const { app } = t.context
  const organizationId = '5b165cb5202e8986f99ec5c0'
  const res = await request(app)
    .put(`/api/projects/${organizationId}`)
    .send({ name: 'Updated name' })

  const error = new NotFoundError()

  t.is(res.status, error.status)
  t.is(res.body.error.name, error.name)
  t.is(res.body.error.message, error.message)
})
