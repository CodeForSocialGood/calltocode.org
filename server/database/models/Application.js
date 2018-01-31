import mongoose from 'mongoose'

const ApplicationSchema = mongoose.Schema({
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true
  },
  seenAt: Date
}, { timestamps: true })

ApplicationSchema.methods.toJSON = function () {
  return {
    id: this._id,
    volunteer: this.volunteer,
    project: this.project,
    status: this.status,
    seenAt: this.seenAt,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

ApplicationSchema.methods.accept = function () {
  this.status = 'accepted'
  return this.save()
}

ApplicationSchema.methods.reject = function () {
  this.status = 'rejected'
  return this.save()
}

export default mongoose.model('Application', ApplicationSchema)
