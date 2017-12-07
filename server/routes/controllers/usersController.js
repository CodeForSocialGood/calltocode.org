const UserModel = require('../../database/models/User')

const usersController = {
  _init (Users = UserModel) {
    this.Users = Users
    return this
  },

  preloadUser (req, res, next, id) {
    this.Users.findById(id, (err, user) => {
      if (err) {
        return res.sendStatus(500)
      }

      if (!user) {
        return res.sendStatus(404)
      }

      req.user = user

      return next()
    })
  },

  getUsers (req, res) {
    return this.Users.find({}, (err, users) => {
      if (err) {
        return res.sendStatus(500)
      }

      return res.status(200).send(users.map(user => user.toJSON()))
    })
  },

  getUser (req, res) {
    return res.status(200).send(req.user.toJSON())
  },

  signup (req, res) {
    const user = new this.User(req.body.user)

    return user.save(err => {
      if (err) {
        return res.sendStatus(500)
      }

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).send(user.toJSON())
    })
  },

  login (req, res) {
    const { email, password } = req.body

    this.Users.findOne({ email }, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }

      if (user && password === user.password) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).send(user.toJSON())
      } else if (password !== user.password) {
        res.statusMessage = 'Wrong Password'
      } else {
        res.statusMessage = 'Wrong Email'
      }

      res.sendStatus(403)
    })
  },

  updateUser (req, res) {},

  getUserByEmail (req, res) {
    const { email } = req.body

    this.Users.findOne({ email }, (err, user) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }

      if (user) {
        res.status(200).json(user)
      }

      res.sendStatus(404)
    })
  }
}

module.exports = usersController
