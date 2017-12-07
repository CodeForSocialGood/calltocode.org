const UserModel = require('../../database/models/User')

const usersController = {
  _init (Users = UserModel) {
    this.Users = Users
    return this
  },

  getCurrent (req, res) {
    this.Users.findById(req.payload.id).exec((err, user) => {
      if (err) {
        return res.sendStatus(500)
      }

      if (!user) {
        return res.sendStatus(404)
      }

      return res.status(200).send(user.toJSON())
    })
  },

  putCurrent (req, res) {
    this.Users.findById(req.payload.id).exec((err, user) => {
      if (err) {
        return res.sendStatus(500)
      }

      if (!user) {
        return res.sendStatus(404)
      }

      const { projectsAppliedFor } = req.body.user

      if (typeof projectsAppliedFor !== 'undefined') {
        user.projectsAppliedFor = projectsAppliedFor
      }

      return user.save(err => {
        if (err) {
          return res.sendStatus(500)
        }

        return res.status(200).send(user.toJSON())
      })
    })
  }
}

module.exports = usersController
