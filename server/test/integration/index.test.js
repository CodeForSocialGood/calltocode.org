const test = require('ava')
const request = require('supertest')

const { before, beforeEach, afterEach, after } = require('../util')

test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)
test.after.always(after)

test.serial('GET /: respond with html', async t => {
  const { app } = t.context
  const res = await request(app).get('/')

  t.is(res.status, 200)
  t.is(res.type, 'text/html')
})
