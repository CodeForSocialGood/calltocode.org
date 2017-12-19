const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
  name: String,
  role: String,
  email: String
}, { timestamps: true })

ProjectSchema.methods.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    role: this.role,
    email: this.email
  }
}

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
