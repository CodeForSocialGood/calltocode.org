import test from 'ava'
import {mock, match} from 'sinon'
import EmailService from './EmailService'

let sendgrid
let sendgridMock
let emailService

test.beforeEach('instantiate emailService', () => {
  sendgrid = {
    setApiKey () {},
    send () {}
  }
  sendgridMock = mock(sendgrid)
})

test('.constructor(): setup sendgrid', t => {
  sendgridMock.expects('setApiKey')
    .once()
    .calledWithExactly(match.string)

  emailService = new EmailService(sendgrid)

  t.is(emailService.email, sendgrid)
  sendgridMock.verify()
})

test('.send(): send email', t => {
  const from = 'from@email.com'
  const to = 'to@email.com'
  const subject = 'some subject'
  const text = 'some text'

  sendgridMock.expects('send')
    .once()
    .calledWithExactly({
      from,
      to,
      subject,
      text,
      html: `<strong>${text}</strong>`
    })

  emailService = new EmailService(sendgrid)
  emailService.send(from, to, subject, text)

  sendgridMock.verify()
  t.pass()
})
