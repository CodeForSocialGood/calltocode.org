import test from 'ava'
import { mock, match } from 'sinon'

import index from './index'

test('get index page', t => {
  // setup
  const path = {
    join () {}
  }
  const res = {
    sendFile () {}
  }

  // mock
  const mockPath = mock(path)
    .expects('join')
    .once()
    .withArgs(match.any)
    .returns('some path')
  const mockRes = mock(res)
    .expects('sendFile')
    .once()
    .withExactArgs('some path')

  // execute
  index._init(path)
  index.getIndexPage(null, res)

  // verify
  mockPath.verify()
  mockRes.verify()
  t.pass()
})
