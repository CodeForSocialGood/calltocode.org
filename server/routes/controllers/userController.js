const UserModel = require('../../database/models/User')

const userController = {
  _init (Users = UserModel) {
    this.Users = Users
    return this
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

  getUser (req, res) {
    const users = this.Users

    users.findById({ _id: req.params.id }, (err, user) => {
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
  },

  updateUser (req, res) {
    const users = this.Users
    const { oppId, userId } = req.body

    users.update({ id: userId }, (err, user) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }

      if (user.opportunitiesAppliedFor.indexOf(oppId) === -1) {
        user.opportunitiesAppliedFor = [...user.opportunitiesAppliedFor, oppId]
      }
      res.json(user)
    })
  }
}

module.exports = userController
