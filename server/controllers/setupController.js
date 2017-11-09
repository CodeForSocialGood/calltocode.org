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

    this.seedCollection(req, res, opps, seedOppsData)
  },

  seedUsers (req, res) {
    const users = this.Users

    this.seedCollection(req, res, users, seedUsersData)
  },

  seedCollection (req, res, model, seedData) {
    model.count({}, (err, count) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }

      if (count !== 0) {
        console.log(`${model.collection.name} already seeded!`)
        return res.send(`${model.collection.name} already seeded!`)
      }

      model.create(seedData, (err, results) => {
        if (err) {
          console.error(err)
          return res.sendStatus(500)
        }

        console.log(`${model.collection.name} seeded!`)
        return res.status(200).send(`${model.collection.name} seeded!`)
      })
    })
  }
}

module.exports = setupController
