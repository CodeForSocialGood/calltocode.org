import logger from './logger'
import { mailerConfig } from '../config'

const { client, isFunctional, fromEmail } = mailerConfig

export default {
  async send (toEmail, { subject, html, text }) {
    if (!isFunctional) return

    try {
      const mail = { from: fromEmail, to: toEmail, subject, html, text }
      await client.send(mail)
    } catch (err) {
      logger.error(err)
    }
  },

  async sendApplication (user, project) {
    const { email: fromEmail } = user
    const { email: toEmail, name, role } = project

    const subject = `Application for ${name}`
    const text = `${fromEmail} is interested in the role ${role} for project ${name}.`
    const html = `<strong>${text}</strong>`

    await this.send(toEmail, { subject, html, text })
  },

  async sendPasswordCode (user, code) {
    const { email: toEmail } = user

    const subject = `Validation code for ${toEmail}`
    const text = `Your validation code is: ${code}`
    const html = `<strong>${text}</strong>`

    await this.send(toEmail, { subject, html, text })
  }
}
