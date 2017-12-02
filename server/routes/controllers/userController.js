const UserModel = require('../../database/models/User')

const userController = {
  _init (Users = UserModel) {
    this.Users = Users
    return this
  },

  getUser (req, res) {
    this.Users.findById(req.payload.id, (err, user) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }

      if (user) {
        return res.status(200).send({ user: user.toJSON() })
      }

      return res.sendStatus(404)
    })
  },

  getUserByEmail (req, res) {
    const users = this.Users
    const { email } = req.body

    users.findOne({ email }, (err, user) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }

      if (user) {
        res.status(200).json(user)
      }

      res.sendStatus(404)
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
  },

  updateUser (req, res) {
    const users = this.Users
    const { updatedUser } = req.body

    users.findOneAndUpdate({ _id: updatedUser.id }, updatedUser, { new: true }, (err, newUser) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }

      res.json(newUser)
    })
  }
}

module.exports = userController
