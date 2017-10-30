import test from 'ava'
import request from 'supertest'
import app from './index'

test('GET /: respond with html', async t => {
  const response = await request(app).get('/')
  t.is(response.status, 200)
  t.is(response.type, 'text/html')
})
