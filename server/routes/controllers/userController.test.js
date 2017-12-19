import test from 'ava'
import request from 'supertest'

import { before, beforeEach, afterEach, after, formatData } from '../../test/util'
import seedUsers from '../../../db/seedData/users.json'
import User from '../../database/models/User'

const generateSessionToken = User.schema.methods.generateSessionToken

test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)
test.after.always(after)

test.serial('getCurrent, valid token', async t => {
  const { app } = t.context
  const user = formatData(seedUsers[0])
  const token = generateSessionToken.call(user)
  const res = await request(app)
    .get('/api/user')
    .set('Authorization', `Token ${token}`)

  t.is(res.status, 200)
  t.is(res.body.email, user.email)
})

test.serial('getCurrent, invalid token should error unauthorized', async t => {
  const { app } = t.context
  const res = await request(app)
    .get('/api/user')
    .set('Authorization', 'Token invalid')

  t.is(res.status, 401)
})

test.serial('putCurrent, valid token', async t => {
  const { app } = t.context
  const user = formatData(seedUsers[0])
  const token = generateSessionToken.call(user)
  const updatedEmail = 'updatedEmail@email.com'
  const res = await request(app)
    .put('/api/user')
    .set('Authorization', `Token ${token}`)
    .send({ user: { email: updatedEmail } })

  t.is(res.status, 200)
  t.is(res.body.email, updatedEmail)
})

test.serial('putCurrent, invalid token should error unauthorized', async t => {
  const { app } = t.context
  const res = await request(app)
    .put('/api/user')
    .set('Authorization', 'Token invalid')

  t.is(res.status, 401)
})
