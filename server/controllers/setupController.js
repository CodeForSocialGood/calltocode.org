const OppsModel = require('../database/models/Opportunities')
const seedOpps = require('../database/seedOpportunities')

const setupController = {
  _init (Opps = OppsModel) {
    this.Opps = Opps
    this.seedOpps = seedOpps
    return this
  },

  seedDatabase (req, res) {
    const opps = this.Opps
    opps.create( seedOpps, (err, results) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      console.log(`seeded database!`)
      return res.send(results)
    })
  }
}

module.exports = setupController
