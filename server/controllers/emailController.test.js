import test from 'ava'
import { mock, match } from 'sinon'
import emailController from './emailController'

test('send email to organization', t => {
  // setup
  const emailClient = {
    setApiKey () {},
    send () {}
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
    sendStatus () {}
  }

  // mock
  const mockEmailClient = mock(emailClient)
  mockEmailClient.expects('setApiKey')
    .once()
    .withExactArgs(match.any)
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
  emailController.sendEmailToOrganization(req, res)

  // verify
  mockEmailClient.verify()
  mockRes.verify()
  t.pass()
})
