const mongoose = require('mongoose')

const opportunitiesSchema = mongoose.Schema({
  name: String,
  role: String,
  email: String
})

const Opportunities = mongoose.model('Opportunities', opportunitiesSchema)

module.exports = Opportunities
