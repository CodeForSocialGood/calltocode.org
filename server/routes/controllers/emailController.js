const sendgrid = require('@sendgrid/mail')

const bindFunctions = require('../../bindFunctions')
const { emailConfig } = require('../../config')

const emailController = {
  _init (emailClient = sendgrid) {
    bindFunctions(this)

    this.emailClient = emailClient
    this.emailClient.setApiKey(emailConfig.sendgridApiKey)
    return this
  },

  sendToOrg (req, res) {
    const {email, name, role} = req.body.project
    const text = `I am interested in the role ${role}!`
    const message = {
      from: req.body.user.email,
      to: email,
      subject: `Application for ${name}`,
      html: `<strong>${text}</strong>`,
      text
    }
    this.emailClient.send(message)
    res.sendStatus(200)
  }
}

module.exports = emailController
