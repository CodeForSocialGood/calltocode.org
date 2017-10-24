const UserModel = require('../database/models/User')

const loginController = {
  _init (User = UserModel) {
    this.User = User
    return this
  },

  login (req, res) {
    const {email, password} = req.body
    this.User.findOne({ email }, 'email password', (error, user) => {
      if (error) {
        console.error(error)
        return res.sendStatus(403)
      }

      if (user && password === user.password) {
        return res.sendStatus(200)
      }

      res.sendStatus(403)
    })
  }
}

module.exports = loginController
