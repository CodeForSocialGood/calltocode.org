export default {
  get client () {
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'test':
        const sendgrid = require('@sendgrid/mail')
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
        return sendgrid
      default:
        const options = { devPort: 1025, devHost: 'localhost' }
        const sendmail = require('sendmail')(options)
        sendmail.send = sendmail
        return sendmail
    }
  },
  get isFunctional () {
    switch (process.env.NODE_ENV) {
      case 'prod':
      case 'test': return !!process.env.SENDGRID_API_KEY
      default: return true
    }
  },
  fromEmail: 'team.calltocode@gmail.com'
}
