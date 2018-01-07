import test from 'ava'
import { mock, match } from 'sinon'
import indexController from './indexController'

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
  indexController._init(path)
  indexController.getIndexPage(null, res)

  // verify
  mockPath.verify()
  mockRes.verify()
  t.pass()
})
