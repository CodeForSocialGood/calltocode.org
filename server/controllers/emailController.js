const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailToOrganization (req, res) {
  const {email, name, role} = req.body.project
  const text = `I am interested in the role ${role}!`
  const message = {
    from: req.body.user.email,
    to: email,
    subject: `Application for ${name}`,
    html: `<strong>${text}</strong>`,
    text
  }
  sendgrid.send(message)
  res.sendStatus(200)
}

module.exports = {
  sendEmailToOrganization
}
