const sendgrid = require('@sendgrid/mail')
const ForgotPasswordModel = require('../../database/models/ForgotPassword')

const forgotPasswordController = {
  _init (emailClient = sendgrid, ForgotPass = ForgotPasswordModel) {
    emailClient.setApiKey(process.env.SENDGRID_API_KEY)
    this.emailClient = emailClient
    this.ForgotPass = ForgotPass
    return this
  },

  _saveIntoDatabase (email, code) {
    const expireDate = new Date()
    expireDate.setHours(expireDate.getHours() + 1)
    const forgot = new this.ForgotPass({email, code, expireDate})
    return forgot.save()
  },

  sendVerificationCodeEmail (req, res) {
    const email = req.body.data.email
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
        return res.sendStatus(200)
      })
      .catch(error => { if (error) return res.sendStatus(500) })
  },

  _generateCode () {
    return Math.floor(Math.random() * 900000) + 100000 // generate a 6 digit code
  }

}

module.exports = forgotPasswordController
