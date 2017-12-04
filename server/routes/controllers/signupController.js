const UserModel = require('../../database/models/User')

const signupController = {
  _init (User = UserModel) {
    this.User = User
    return this
  },

  signupNewUser (req, res) {
    const user = new this.User(req.body.user)
    user.save((error, savedUser) => {
      if (error) {
        console.error(error)
        return res.sendStatus(500)
      }

      res.setHeader('Content-Type', 'application/json')
      return res.send(savedUser.toJSON())
    })
  }
}

module.exports = signupController
