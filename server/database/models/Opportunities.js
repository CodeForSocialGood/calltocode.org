const mongoose = require('mongoose')

const OpportunitiesSchema = mongoose.Schema({
  name: String,
  role: String,
  email: String
}, { timestamps: true })

const Opportunities = mongoose.model('Opportunities', OpportunitiesSchema)

module.exports = Opportunities
