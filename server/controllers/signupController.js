const User = require('../database/models/User')

function signupNewUser (req, res) {
  const user = new User(req.body.user)
  user.save((error, savedUser) => {
    if (error) {
      console.error(error)
      return res.sendStatus(500)
    }
    console.log(`${savedUser.email} saved!`)
    res.sendStatus(200)
  })
}

module.exports = {
  signupNewUser
}
