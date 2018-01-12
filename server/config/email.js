const config = {
  send (message) {
    let mail
    switch (process.env.NODE_ENV) {
      case 'test':
      case 'prod':
        mail = require('@sendgrid/mail')
        mail.setApiKey(process.env.SENDGRID_API_KEY)
        mail.send(message)
        break
      default:
        mail = require('sendmail')({
          devPort: 1025, // Default: False
          devHost: 'localhost' // Default: localhost
        })
        mail(message)
        break
    }
  }
}

module.exports = config
