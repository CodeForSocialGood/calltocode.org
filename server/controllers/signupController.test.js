import test from 'ava'
import { stub, mock } from 'sinon'
import signupController from './signupController'

let res
test.beforeEach(() => {
  res = {
    sendStatus () {},
    setHeader () {},
    send () {}
  }
})

test('signup new user', t => {
  // setup
  const user = {
    email: 'user@email.com',
    toJSON () {}
  }
  const UserModel = {
    save (cb) { cb(null, user) }
  }
  const req = {
    body: {
      user: 'any user'
    }
  }

  // mocks
  const stubUserModel = stub()
    .withArgs('any user')
    .returns(UserModel)
  const mockRes = mock(res)
    .expects('send')
    .once()
    .withExactArgs({ user: user.toJSON() })

  // execute
  signupController._init(stubUserModel)
  signupController.signupNewUser(req, res)

  // verify
  mockRes.verify()
  t.pass()
})

test('do not signup new user when user already exists', t => {
  // setup
  function MockException () {}
  const user = {
    save (cb) { cb(new MockException()) }
  }
  const req = {
    body: {
      user: 'any user'
    }
  }

  // mock
  const stubUserModel = stub()
    .withArgs('any user')
    .returns(user)
  const mockRes = mock(res)
    .expects('sendStatus')
    .once()
    .withExactArgs(500)

    // execute
  signupController._init(stubUserModel)
  signupController.signupNewUser(req, res)

  // verify
  mockRes.verify()
  t.pass()
})
