import test from 'ava'
import {mock} from 'sinon'
import loginController from './loginController'

let res
test.beforeEach(() => {
  res = {
    sendStatus () {},
    setHeader () {},
    send () {}
  }
})

test('login with email and password', t => {
  // setup
  const req = {
    body: {
      email: 'anyemail@email.com',
      password: 'any password'
    }
  }

  const UserModel = {
    findOne (query, fieldsToReturn, cb) {
      if (query.email === req.body.email && fieldsToReturn === 'email password opportunitiesAppliedFor') {
        cb(null, req.body)
      }
    }
  }

  // mocks
  const resMock = mock(res)
    .expects('send')

  // action
  loginController._init(UserModel)
  loginController.login(req, res)

  // test
  resMock.verify()
  t.pass()
})

test('return unathorized when login fails', t => {
  // setup
  const req = {
    body: {}
  }
  const res = {
    sendStatus () {}
  }
  const UserModel = {
    findOne (query, fieldsToReturn, cb) {
      cb(new Error(null))
    }
  }

  // mocks
  const resMock = mock(res)
    .expects('sendStatus')
    .once()
    .withExactArgs(403)

  // action
  loginController._init(UserModel)
  loginController.login(req, res)

  // test
  resMock.verify()
  t.pass()
})
