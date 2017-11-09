const UserModel = require('../database/models/User')

const userController = {
  _init (Users = UserModel) {
    this.Users = Users
    return this
  },

  getUser (req, res) {
    const users = this.Users

    users.findById({ _id : req.params.id }, (err, user) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }

      if (user) {
        return res.status(200).send(user)
      }
      return res.sendStatus(404)
    })

  },

  getAllUsers (req, res) {
    const users = this.Users

    return users.find({}, (err, users) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      return res.send(users)
    })

  }
}

module.exports = userController
