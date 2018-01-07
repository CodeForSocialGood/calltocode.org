const sendgrid = require('@sendgrid/mail')

const bindFunctions = require('../../bindFunctions')
const ForgotPasswordModel = require('../../database/models/ForgotPassword')

const forgotPasswordController = {
  _init (emailClient = sendgrid, ForgotPass = ForgotPasswordModel) {
    bindFunctions(this)

    emailClient.setApiKey(process.env.SENDGRID_API_KEY)
    this.emailClient = emailClient
    this.ForgotPass = ForgotPass
    return this
  },

  _saveIntoDatabase (email, code) {
    const forgot = new this.ForgotPass({ email, code })
    return forgot.save()
  },

  _generateCode () {
    return Math.floor(Math.random() * 900000) + 100000 // generate a 6 digit code
  },

  sendVerificationCodeEmail (req, res) {
    const email = req.body.email
    const code = this._generateCode()
    this._saveIntoDatabase(email, code)
      .then(saveForgot => {
        const text = `Your validation code is: ${code}`
        const message = {
          from: 'team.calltocode@gmail.com',
          to: email,
          subject: `Validation code for ${email}`,
          html: `<strong>${text}</strong>`,
          text
        }
        this.emailClient.send(message)
        return res.status(200).send({ status: 200 })
      })
      .catch(error => { if (error) return res.status(500).send({ status: 500 }) })
  }
}

module.exports = forgotPasswordController
