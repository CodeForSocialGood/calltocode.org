const OppsModel = require('../database/models/Opportunities')
const UserModel = require('../database/models/User')
const seedOppsData = require('../database/seedOpportunities')
const seedUsersData = require('../database/seedUsers')

const setupController = {
  _init (Opps = OppsModel, Users = UserModel) {
    this.Opps = Opps
    this.Users = Users
    return this
  },

  seedOpps (req, res) {
    const opps = this.Opps

    opps.count({}, (err, count) => {
      if (count !== 0) {
        console.log('opps already seeded!')
        return res.send('opps already seeded!')
      }

      opps.create(seedOppsData, (err, results) => {
        if (err) {
          console.error(err)
          return res.sendStatus(500)
        }

        console.log(`seeded opportunities!`)
        return res.status(200).send(`seeded opportunities!`)
      })

    })
  },

  seedUsers (req, res) {
    const users = this.Users

    users.count({}, (err, count) => {
      if (count !== 0) {
        console.log('users already seeded!')
        return res.send('users already seeded!')
      }

      users.create(seedUsersData, (err, results) => {
        if (err) {
          console.error(err)
          return res.sendStatus(500)
        }

        console.log(`seeded users!`)
        return res.status(200).send(`seeded users!`)
      })
    })
  },
}

module.exports = setupController
