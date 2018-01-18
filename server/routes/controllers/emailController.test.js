const test = require('ava')
const { mock } = require('sinon')

const emailController = require('./emailController')

test('send email to organization', t => {
  // setup
  const emailClient = {
    send () { }
  }

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
    sendStatus () { }
  }

  // mock
  const mockEmailClient = mock(emailClient)
  mockEmailClient.expects('send')
    .once()
    .withExactArgs({
      from: 'user@email.com',
      to: 'project@email.com',
      subject: 'Application for some name',
      html: '<strong>I am interested in the role some role!</strong>',
      text: 'I am interested in the role some role!'
    })
  const mockRes = mock(res)
    .expects('sendStatus')
    .once()
    .withExactArgs(200)

  // execute
  emailController._init(emailClient)
  emailController.sendToOrg(req, res)

  // verify
  mockEmailClient.verify()
  mockRes.verify()
  t.pass()
})
