import test from 'ava'
import request from 'supertest'

import { before, beforeEach, afterEach, after } from '../../test/util'

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
