import bindFunctions from '../../lib/bindFunctions'
import ApplicationModel from '../../database/models/Application'
import mailer from '../../lib/mailer'
import { NotFoundError } from '../../lib/errors'

export default {
  _init (Applications = ApplicationModel) {
    bindFunctions(this)

    this.Applications = Applications
    return this
  },

  async getApplications (req, res) {
    const query = {}
    const limit = Number(req.query.limit) || 5
    const offset = Number(req.query.offset) || 0
    const sort = { createdAt: 'desc' }

    const { volunteer, project, status } = req.query

    if (typeof volunteer !== 'undefined') {
      query.volunteer = volunteer
    }

    if (typeof project !== 'undefined') {
      query.project = project
    }

    if (typeof status !== 'undefined') {
      query.status = status
    }

    const applications = await this.Applications
      .find(query)
      .limit(limit)
      .skip(offset)
      .sort(sort)
      .populate('project')

    return res.status(200).json(applications.map(application => application.toJSON()))
  },

  async createApplication (req, res) {
    const application = new this.Applications(req.body)
    const newApplication = await application.save()
    await mailer.sendApplication(req.body.volunteer, req.body.project)

    return res.status(200).json(newApplication.toJSON())
  },

  async acceptApplication (req, res) {
    const application = req.application

    await application.accept()

    return res.status(200).json(application.toJSON())
  },

  async rejectApplication (req, res) {
    const application = req.application

    await application.reject()

    return res.status(200).json(application.toJSON())
  },

  async applicationById (req, res, next, id) {
    const application = await this.Applications.findById(id)

    if (!application) throw new NotFoundError()

    req.application = application
    next()
  }
}
