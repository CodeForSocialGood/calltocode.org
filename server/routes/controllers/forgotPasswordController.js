const sendgrid = require('@sendgrid/mail')
const ForgotPasswordModel = require('../../database/models/ForgotPassword')
const UserModel = require('../../database/models/User')

const forgotPasswordController = {
  _init (emailClient = sendgrid, ForgotPass = ForgotPasswordModel, Users = UserModel) {
    emailClient.setApiKey(process.env.SENDGRID_API_KEY)
    this.emailClient = emailClient
    this.ForgotPass = ForgotPass
    this.Users = Users
    this.sendVerificationCodeEmail = this.sendVerificationCodeEmail.bind(this)
    this.validateCode = this.validateCode.bind(this)

    return this
  },

  _saveIntoDatabase (email, code) {
    const forgot = new this.ForgotPass({ email, code })
    return forgot.save()
  },

  _generateCode () {
    return Math.floor(Math.random() * 900000) + 100000 // generate a 6 digit code
  },

  _getUser (email) {
    return this.Users.findOne({email}).exec((err, forgot) => {
      return !!err
    })
  },

  sendVerificationCodeEmail (req, res) {
    const email = req.body.email

    this._getUser(email).then((exists) => {
      // if the user does not exist, do not generate code and send email. It's expected that the user inserts a valid email.
      if (!exists) {
        return res.status(200).send({ status: 200 })
      }
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
    }).catch(error => { if (error) return res.status(500).send({ status: 500 }) })
  },

  validateCode (req, res) {
    const {email, code} = req.body
    this.ForgotPass.findOne({email, code}).exec((err, forgot) => {
      if (err) {
        return res.status(404).json({error: 'Invalid code or email'})
      }
      if (forgot) {
        forgot.remove()
        return res.status(200).json({status: 200})
      }
      return res.status(404).json({error: 'Invalid code or email'})
    })
  }
}

module.exports = forgotPasswordController
