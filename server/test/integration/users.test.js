const test = require('ava')
const request = require('supertest')

const { before, beforeEach, afterEach, after } = require('../util')
const User = require('../../database/models/User')

const generateSessionToken = User.schema.methods.generateSessionToken

test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)
test.after.always(after)

test.serial('getCurrent, valid token', async t => {
  const { app, users: [user] } = t.context
  const token = generateSessionToken.call(user)
  const res = await request(app)
    .get('/api/users/current')
    .set('Authorization', `Token ${token}`)

  t.is(res.status, 200)
  t.true(typeof res.body === 'object')
  t.is(res.body.id, user._id)
  t.is(res.body.email, user.email)
})

test.serial('getCurrent, invalid token should error unauthorized', async t => {
  const { app } = t.context
  const res = await request(app)
    .get('/api/users/current')
    .set('Authorization', 'Token invalid')

  t.is(res.status, 401)
  t.true(typeof res.body === 'object')
  t.is(res.body.error.name, 'UnauthorizedError')
})

test.serial('putCurrent, valid token', async t => {
  const { app, users: [user] } = t.context
  const token = generateSessionToken.call(user)
  const updatedEmail = 'updatedEmail@email.com'
  const res = await request(app)
    .put('/api/users/current')
    .set('Authorization', `Token ${token}`)
    .send({ user: { email: updatedEmail } })

  t.is(res.status, 200)
  t.true(typeof res.body === 'object')
  t.is(res.body.id, user._id)
  t.is(res.body.email, updatedEmail)
})

test.serial('putCurrent, invalid token should error unauthorized', async t => {
  const { app } = t.context
  const res = await request(app)
    .put('/api/users/current')
    .set('Authorization', 'Token invalid')

  t.is(res.status, 401)
  t.true(typeof res.body === 'object')
  t.is(res.body.error.name, 'UnauthorizedError')
})

test.serial('getUsers', async t => {
  const { app, users } = t.context
  const res = await request(app)
    .get('/api/users')

  t.is(res.status, 200)
  t.true(Array.isArray(res.body))
  t.is(res.body.length, users.length)
})

test.serial('signup, valid user', async t => {
  const { app } = t.context
  const user = {
    usertype: 'volunteer',
    email: 'test@email.com',
    salt: 'salt',
    hash: 'hash'
  }
  const res = await request(app)
    .post('/api/users')
    .send({ user })

  t.is(res.status, 200)
  t.true(typeof res.body === 'object')
  t.is(res.body.usertype, user.usertype)
  t.is(res.body.email, user.email)
})

test.serial('signup, invalid user should error', async t => {
  const { app } = t.context
  const user = {}
  const res = await request(app)
    .post('/api/users')
    .send({ user })

  t.is(res.status, 500)
})

test.serial('getUser', async t => {
  const { app, users: [user] } = t.context
  const token = generateSessionToken.call(user)
  const res = await request(app)
    .get(`/api/users/${user._id}`)
    .set('Authorization', `Token ${token}`)

  t.is(res.status, 200)
  t.is(res.body.id, user._id)
  t.is(res.body.usertype, user.usertype)
  t.is(res.body.email, user.email)
})
