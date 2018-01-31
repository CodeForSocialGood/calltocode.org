import test from 'ava'
import { mock, stub } from 'sinon'
import { ForbiddenError } from '../../lib/errors'

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

test('createUser', async t => {
  // Setup
  const { res } = t.context
  const user = {
    email: 'user@email.com',
    toJSON () {}
  }
  const req = { body: user }
  const UserModel = {
    save () { return user }
  }

  // mocks
  const stubUserModel = stub()
    .withArgs('any user')
    .returns(UserModel)
  const resMock = mock(res)
    .expects('json')
    .once()
    .withExactArgs(user.toJSON())

  // execute
  users._init(stubUserModel)
  await users.createUser(req, res)

  // verify
  resMock.verify()
  t.pass()
})

test.todo('getUser')

test.todo('putUser')

test('login', async t => {
  // Setup
  const { res } = t.context
  const user = {
    email: 'anyemail@email.com',
    salt: 'any salt',
    hash: 'any hash',
    toJSON () {}
  }
  const req = { body: user }
  const UserModel = {
    findOne () { return user }
  }

  // mocks
  const resMock = mock(res)
    .expects('json')
    .once()
    .withExactArgs(user.toJSON())

  // action
  users._init(UserModel)
  await users.login(req, res)

  // test
  resMock.verify()
  t.pass()
})

test('login, throw ForbiddenError when login fails', async t => {
  // Setup
  const { res } = t.context
  const user = {
    email: 'anyemail@email.com',
    hash: 'hash',
    toJSON () {}
  }
  const req = {
    body: {
      email: user.email,
      hash: 'different hash'
    }
  }
  const UserModel = {
    findOne () { return user }
  }

  // Action
  users._init(UserModel)

  // Test
  const forbidden = new ForbiddenError('Invalid email or password')
  const error = await t.throws((async () => {
    await users.login(req, res)
  })())

  t.is(error.name, forbidden.name)
  t.is(error.message, forbidden.message)
  t.is(error.status, forbidden.status)
})

test.todo('getSalt')

test.todo('changePassword')

test.todo('createCode')

test.todo('validateCode')
