import test from 'ava'
import request from 'supertest'

import { before, beforeEach, afterEach, after, formatData } from '../../test/util'
import seedProjects from '../../../db/seedData/projects.json'
import Project from '../../database/models/Project'

const toJSON = Project.schema.methods.toJSON

test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)
test.after.always(after)

test.serial('getProjects, all', async t => {
  const { app } = t.context
  const res = await request(app)
    .get('/api/projects')

  t.is(res.status, 200)
  t.is(res.body.length, seedProjects.length)
})

test.serial('getProjects, volunteer with valid projects', async t => {
  const { app } = t.context
  const projectsAppliedFor = ['5a165cb5202e8986f99ec5c1', '5a165cb5202e8986f99ec5c3']
  const res = await request(app)
    .get('/api/projects')
    .query({ projectsAppliedFor: projectsAppliedFor.join(',') })

  t.is(res.status, 200)
  t.is(res.body.length, projectsAppliedFor.length)
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
  const { app } = t.context
  const project = formatData(seedProjects[0])
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
