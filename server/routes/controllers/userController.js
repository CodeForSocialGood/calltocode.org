const UserModel = require('../../database/models/User')

const userController = {
  _init (Users = UserModel) {
    this.Users = Users

    this.getCurrent = this.getCurrent.bind(this)
    this.putCurrent = this.putCurrent.bind(this)
    return this
  },

  getCurrent (req, res, next) {
    const id = req.payload.id

    this.Users.findById(id).then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      return res.status(200).json(user.toJSON())
    }).catch(next)
  },

  putCurrent (req, res, next) {
    const id = req.payload.id

    this.Users.findById(id).then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      const { email, projectsAppliedFor } = req.body.user

      if (typeof email !== 'undefined') {
        user.email = email
      }

      if (typeof projectsAppliedFor !== 'undefined') {
        user.projectsAppliedFor = projectsAppliedFor
      }

      user.save().then(() => {
        return res.status(200).send(user.toJSON())
      })
    }).catch(next)
  }
}

module.exports = userController
