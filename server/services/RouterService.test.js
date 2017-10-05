import test from 'ava'
import {spy, mock, match} from 'sinon'
import RouterService from './RouterService'

let routerService
let emailServiceMock

test.beforeEach('setup', () => {
  const emailService = {
    send () {}
  }
  emailServiceMock = mock(emailService)
  routerService = new RouterService(emailService)
})

test('.getIndex(): show an html file', t => {
  const res = {
    sendFile: spy()
  }

  routerService.getIndex(null, res)

  t.true(res.sendFile.calledWithExactly(match.string))
})

test('.postEmail(): send an email', t => {
  const req = {
    body: {
      project: {
        email: 'some@email.com',
        name: 'some name',
        role: 'some role'
      },
      user: {
        email: 'another@email.com'
      }
    }
  }
  const res = {
    sendStatus: spy()
  }

  emailServiceMock.expects('send')
    .once()
    .calledWithExactly(
      req.body.user.email,
      req.body.project.email,
      'Application for some name',
      'I am interested in the role some role!'
    )

  routerService.postEmail(req, res)

  emailServiceMock.verify()
  t.true(res.sendStatus.calledWithExactly(200))
})
