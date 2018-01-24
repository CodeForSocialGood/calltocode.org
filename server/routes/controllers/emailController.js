import bindFunctions from '../../lib/bindFunctions'
import { emailConfig } from '../../config'

export default {
  _init (emailClient = emailConfig) {
    bindFunctions(this)

    this.emailClient = emailClient
    return this
  },

  sendToOrg (req, res) {
    const { email, name, role } = req.body.project
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
