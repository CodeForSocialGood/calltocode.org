const bindFunctions = require('../../bindFunctions')
const ForgotPasswordModel = require('../../database/models/ForgotPassword')
const UserModel = require('../../database/models/User')
const { emailConfig } = require('../../config')

const forgotPasswordController = {
  _init (ForgotPass = ForgotPasswordModel, Users = UserModel, emailClient = emailConfig) {
    bindFunctions(this)

    this.emailClient = emailClient
    this.ForgotPass = ForgotPass
    this.Users = Users
    return this
  },

  _insertOrUpdateVerificationCode (email, code) {
    return this.ForgotPass.findOneAndUpdate({email}, {$set: { email, code }}, {upsert: true, 'new': true}).exec()
  },

  _generateSixDigitCode () {
    return Math.floor(Math.random() * 900000) + 100000
  },

  _checkIfUserExists (email) {
    return this.Users.findOne({email}).exec()
  },

  async sendVerificationCodeEmail (req, res) {
    const email = req.body.email

    try {
      const user = await this._checkIfUserExists(email)
      if (!user) return res.sendStatus(200)

      const code = this._generateSixDigitCode()
      await this._insertOrUpdateVerificationCode(email, code)

      const text = `Your validation code is: ${code}`
      const message = {
        from: 'team.calltocode@gmail.com',
        to: email,
        subject: `Validation code for ${email}`,
        html: `<strong>${text}</strong>`,
        text
      }
      this.emailClient.send(message)

      res.sendStatus(200)
    } catch (error) {
      res.sendStatus(500)
    }
  },

  validateCode (req, res) {
    const {email, code} = req.body

    this.ForgotPass.findOne({email, code}).exec()
      .then(user => {
        if (user) {
          user.remove()
          return res.sendStatus(200)
        }
        res.status(404).json({error: 'Invalid code or email'})
      })
      .catch(() => res.status(404).json({error: 'Invalid code or email'}))
  }
}

module.exports = forgotPasswordController
