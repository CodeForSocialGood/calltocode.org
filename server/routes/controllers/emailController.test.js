const test = require('ava')
const { mock } = require('sinon')

const emailController = require('./emailController')

test('send email to organization', t => {
  // setup
  const req = {
    body: {
      project: {
        email: 'project@email.com',
        name: 'some name',
        role: 'some role'
      },
      user: {
        email: 'user@email.com'
      }
    }
  }
  const res = {
    sendStatus () {}
  }

  // mock
  const mockRes = mock(res)
    .expects('sendStatus')
    .once()
    .withExactArgs(200)

  // execute
  emailController._init()
  emailController.sendToOrg(req, res)

  // verify
  mockRes.verify()
  t.pass()
})
