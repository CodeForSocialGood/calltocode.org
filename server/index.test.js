import test from 'ava'
import request from 'supertest'

import { before, beforeEach, afterEach, after } from './test/util'

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
