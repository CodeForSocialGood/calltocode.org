const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  name: String,
  role: String,
  email: String
}, { timestamps: true })

ProjectSchema.methods.toJSON = function () {
  return {
    id: this._id,
    organization: this.organization,
    name: this.name,
    role: this.role,
    email: this.email
  }
}

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
