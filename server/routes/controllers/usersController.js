const UserModel = require('../../database/models/User')

const usersController = {
  _init (Users = UserModel) {
    this.Users = Users

    this.preloadUser = this.preloadUser.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.signup = this.signup.bind(this)
    this.getUser = this.getUser.bind(this)
    this.putUser = this.putUser.bind(this)
    this.login = this.login.bind(this)
    return this
  },

  preloadUser (req, res, next, id) {
    this.Users.findById(id).exec((err, user) => {
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
    return this.Users.find().exec((err, users) => {
      if (err) {
        return res.sendStatus(500)
      }

      return res.status(200).send(users.map(user => user.toJSON()))
    })
  },

  signup (req, res) {
    const newUser = new this.Users(req.body.user)

    return newUser.save((err, user) => {
      if (err) {
        return res.sendStatus(500)
      }

      res.setHeader('Content-Type', 'application/json')
      return res.status(200).send(user.toJSON())
    })
  },

  getUser (req, res) {
    return res.status(200).send(req.user.toJSON())
  },

  putUser (req, res) {},

  login (req, res) {
    const { email, password } = req.body

    this.Users.findOne({ email }).exec((err, user) => {
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

      return res.sendStatus(403)
    })
  }
}

module.exports = usersController
