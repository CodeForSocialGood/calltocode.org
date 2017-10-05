class EmailService {
  constructor (email = require('@sendgrid/mail')) {
    email.setApiKey(process.env.SENDGRID_API_KEY)
    this.email = email
  }

  send (from, to, subject, text) {
    const message = {
      from,
      to,
      subject,
      text,
      html: `<strong>${text}</strong>`
    }

    this.email.send(message)
  }
}

module.exports = EmailService
