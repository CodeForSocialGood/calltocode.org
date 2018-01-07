const test = require('ava')
const request = require('supertest')

const { before, beforeEach, afterEach, after } = require('../util')
const Project = require('../../database/models/Project')

const toJSON = Project.schema.methods.toJSON

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

test.serial('getProjects, volunteer with valid projects', async t => {
  const { app, projects: [one, two] } = t.context
  const projectsAppliedFor = [one._id, two._id]
  const res = await request(app)
    .get('/api/projects')
    .query({ projectsAppliedFor: projectsAppliedFor.join(',') })

  t.is(res.status, 200)
  t.is(res.body.length, projectsAppliedFor.length)

  for (const project of res.body) {
    const inList = projectsAppliedFor.some(p => p._id === project._id)
    t.is(inList, true)
  }
})

test.serial('getProjects, volunteer with invalid projects should error', async t => {
  const { app } = t.context
  const res = await request(app)
    .get('/api/projects')
    .query({ projectsAppliedFor: 'invalid,invalid' })

  t.is(res.status, 500)
})

test.serial('getProjects, contact with valid origanization', async t => {
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

test.serial('getProjects, contact with invalid organization should error', async t => {
  const { app } = t.context
  const res = await request(app)
    .get('/api/projects')
    .query({ organization: 'invalid' })

  t.is(res.status, 500)
})

test.serial('getProject with a valid id', async t => {
  const { app, projects: [project] } = t.context
  const res = await request(app)
    .get(`/api/projects/${project._id}`)

  t.is(res.status, 200)
  t.deepEqual(res.body, toJSON.call(project))
})

test.serial('getProject with a valid unused id should return project not found', async t => {
  const { app } = t.context
  const organizationId = '5b165cb5202e8986f99ec5c0'
  const res = await request(app)
    .get(`/api/projects/${organizationId}`)

  t.is(res.status, 404)
  t.deepEqual(res.body, { error: 'Project not found' })
})

test.serial('getProject with an invalid id should error', async t => {
  const { app } = t.context
  const res = await request(app)
    .get('/api/projects/invalid')

  t.is(res.status, 500)
})
