const path = require('path')
const EmailService = require('./EmailService')

class RouterService {
  constructor (emailService) {
    this.emailService = emailService || new EmailService()
  }

  getIndex (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
  }

  postEmail (req, res) {
    const {email, name, role} = req.body.project
    const subject = `Application for ${name}`
    const text = `I am interested in the role ${role}!`

    this.emailService.send(req.body.user.email, email, subject, text)
    res.sendStatus(200)
  }
}

module.exports = RouterService
