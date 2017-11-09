const OppsModel = require('../database/models/Opportunities')
const UserModel = require('../database/models/User')
const seedOppsData = require('../database/seedOpportunities')
const seedUsersData = require('../database/seedUsers')

const setupController = {
  _init (Opps = OppsModel, Users = UserModel) {
    this.Opps = Opps
    this.Users = Users
    this.seedOpps = this.seedOpps.bind(this)
    this.seedUsers = this.seedUsers.bind(this)
    return this
  },

  setupDatabase (req, res) {
    const opps = this.Opps
    const users = this.Users

    if (opps.length === 0) {
      this.seedOpps(req, res)
    } else if (users.length === 0) {
      this.seedUsers(req, res)
    } else {
      return res.send('DB already setup!')
    }
  },

  seedOpps (req, res) {
    const opps = this.Opps

    opps.create(seedOppsData, (err, results) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      console.log(`seeded opportunities!`)
    })
  },

  seedUsers (req, res) {
    const users = this.Users

    users.create(seedUsersData, (err, results) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      console.log(`seeded users!`)
    })
  }
}

module.exports = setupController
