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

test.skip('createUser', t => {
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

test.skip('createUser, throw Error when user already exists', t => {
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

test.skip('login', t => {
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

test.skip('login, throw ForbiddenError when login fails', t => {
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

test.todo('getSalt')

test.todo('changePassword')

test.todo('createCode')

test.todo('validateCode')
