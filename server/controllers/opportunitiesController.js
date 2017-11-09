const OppsModel = require('../database/models/Opportunities')

const opportunitiesController = {
  _init (opps = OppsModel) {
    this.opps = opps
    return this
  },

  getOpp (req, res) {
    const opps = this.opps

    opps.findById({ _id: req.params.id }, (err, opp) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }

      if (opp) {
        return res.status(200).send(opp)
      }
      return res.sendStatus(404)
    })
  },

  getAllOpps (req, res) {
    const opps = this.opps

    return opps.find({}, (err, opps) => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      return res.send(opps)
    })
  }
}

module.exports = opportunitiesController
