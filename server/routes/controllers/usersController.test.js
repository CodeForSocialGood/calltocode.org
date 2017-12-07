import test from 'ava'
import { mock, stub } from 'sinon'
import usersController from './usersController'

let res
test.beforeEach(() => {
  res = {
    sendStatus () {},
    setHeader () {},
    send () {},
    status () { return this }
  }
})

test('login with email and password', t => {
  // setup
  const req = {
    body: {
      email: 'anyemail@email.com',
      password: 'any password',
      toJSON () {}
    }
  }

  const UserModel = {
    findOne (query) { return this },
    exec (cb) {
      cb(null, req.body)
    }
  }

  // mocks
  const resMock = mock(res)
    .expects('send')
    .once()

  // action
  usersController._init(UserModel)
  usersController.login(req, res)

  // test
  resMock.verify()
  t.pass()
})

test('return unauthorized when login fails', t => {
  // setup
  const req = {
    body: {
      toJSON () {}
    }
  }

  const UserModel = {
    findOne (query) { return this },
    exec (cb) {
      cb(new Error(null))
    }
  }

  // mocks
  const resMock = mock(res)
    .expects('sendStatus')
    .once()
    .withExactArgs(403)

  // action
  usersController._init(UserModel)
  usersController.login(req, res)

  // test
  resMock.verify()
  t.pass()
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
    .withExactArgs(user.toJSON())

  // execute
  usersController._init(stubUserModel)
  usersController.signup(req, res)

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
  usersController._init(stubUserModel)
  usersController.signup(req, res)

  // verify
  mockRes.verify()
  t.pass()
})
