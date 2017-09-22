import test from 'ava'
import request from 'supertest-as-promised'
import app from './index'

test('GET / responds with html', async t => {
  const response = await request(app).get('/')
  t.is(response.status, 200)
  t.is(response.type, 'text/html')
})
