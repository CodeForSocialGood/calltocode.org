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

  getApplications (req, res) {
    const query = {}
    const limit = Number(req.query.limit) || 5
    const offset = Number(req.query.offset) || 0
    const sort = { createdAt: 'desc' }

    const { volunteer } = req.query

    if (typeof volunteer !== 'undefined') {
      query.volunteer = volunteer
    }

    const applications = await this.Applications
      .find(query)
      .limit(limit)
      .skip(offset)
      .sort(sort)

    return res.status(200).json(applications.map(application => application.toJSON()))
  },

  createApplication (req, res) {
    const userId = req.payload.id
    const user = await this.Users.findById(userId)

    if (!user) throw new NotFoundError()

    const application = new this.Applications({ ...req.body, volunteer: user })
    const newApplication = application.save()

    return res.status(200).json(newApplication.toJSON())
  }
}
