const test = require('ava')
const request = require('supertest')

const { before, beforeEach, afterEach, after } = require('../util')

test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)
test.after.always(after)

test.serial('sendVerificationCodeEmail', async t => {
  const { app } = t.context
  const res = await request(app)
    .post('/api/forgot-password')
    .send({ email: 'kevin@email.com' })

  t.is(res.status, 200)
})
