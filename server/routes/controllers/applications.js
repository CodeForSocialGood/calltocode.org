import bindFunctions from '../../lib/bindFunctions'
import ApplicationModel from '../../database/models/Application'
import ProjectModel from '../../database/models/Project'
import UserModel from '../../database/models/User'
import mailer from '../../lib/mailer'
import { NotFoundError } from '../../lib/errors'

export default {
  _init (Applications = ApplicationModel, Projects = ProjectModel, Users = UserModel) {
    bindFunctions(this)

    this.Applications = Applications
    this.Projects = Projects
    this.Users = Users
    return this
  },

  async getApplications (req, res) {
    const query = {}
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

  async getNotifications (req, res) {
    const id = req.payload.id
    const user = await this.Users.findById(id)

    if (!user) throw new NotFoundError()

    const { usertype, organization } = user

    if (usertype === 'contact') {
      const orgProjects = await this.Projects.find({ organization })

      const query = { project: { $in: orgProjects }, seenAt: { $exists: false } }
      const sort = { createdAt: 'desc' }

      const applications = await this.Applications
        .find(query)
        .populate('project', 'name')
        .populate('volunteer', 'email')
        .sort(sort)

      return res.status(200).json(applications.map(application => application.toJSON()))
    }

    return res.sendStatus(200)
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

  async markAsSeenApplication (req, res) {
    const application = req.application

    await application.markAsSeen()

    return res.status(200).json(application.toJSON())
  },

  async applicationById (req, res, next, id) {
    const application = await this.Applications.findById(id)

    if (!application) throw new NotFoundError()

    req.application = application
    next()
  }
}
