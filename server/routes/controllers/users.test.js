import test from 'ava'
import { mock, stub } from 'sinon'

import users from './users'

test.beforeEach(t => {
  t.context.res = {
    sendStatus () {},
    setHeader () {},
    json () {},
    status () { return this }
  }
})

test.todo('getCurrent')

test.todo('putCurrent')

test.todo('getUsers')

test('signup new user', t => {
  // setup
  const { res } = t.context

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
    .expects('json')
    .once()
    .withExactArgs(user.toJSON())

  // execute
  users._init(stubUserModel)
  users.signup(req, res)

  // verify
  mockRes.verify()
  t.pass()
})

test('do not signup new user when user already exists', t => {
  // setup
  const { res } = t.context

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
  users._init(stubUserModel)
  users.signup(req, res)

  // verify
  mockRes.verify()
  t.pass()
})

test.todo('getUser')

test.todo('putUser')

test.todo('getSalt')

test('login with email and password', t => {
  // setup
  const { res } = t.context

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
    .expects('json')
    .once()

  // action
  users._init(UserModel)
  users.login(req, res)

  // test
  resMock.verify()
  t.pass()
})

test('return unauthorized when login fails', t => {
  // setup
  const { res } = t.context

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
  users._init(UserModel)
  users.login(req, res)

  // test
  resMock.verify()
  t.pass()
})

test.todo('changePassword')
