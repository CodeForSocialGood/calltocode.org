const sendgrid = require('@sendgrid/mail')

const emailController = {
  _init (emailClient = sendgrid) {
    emailClient.setApiKey(process.env.SENDGRID_API_KEY)
    this.emailClient = emailClient
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
    // TODO: Need SENDGRID_API_KEY in process.env for this to not error
    this.emailClient.send(message)
    res.sendStatus(200)
  }
}

module.exports = emailController
