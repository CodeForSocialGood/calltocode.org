import bindFunctions from '../../lib/bindFunctions'
import ProjectModel from '../../database/models/Project'
import UserModel from '../../database/models/User'
import mailer from '../../lib/mailer'
import { NotFoundError } from '../../lib/errors'

export default {
  _init (Projects = ProjectModel, Users = UserModel) {
    bindFunctions(this)

    this.Projects = Projects
    this.Users = Users
    return this
  },

  async getProjects (req, res, next) {
    const query = {}
    const limit = Number(req.query.limit) || 20
    const offset = Number(req.query.offset) || 0
    const sort = { createdAt: 'desc' }

    const { projectsAppliedFor, organization } = req.query

    if (typeof projectsAppliedFor !== 'undefined') {
      query._id = { $in: projectsAppliedFor.split(',').filter(v => !!v) }
    }

    if (typeof organization !== 'undefined') {
      query.organization = organization
    }

    const projects = await this.Projects
      .find(query)
      .limit(limit)
      .skip(offset)
      .sort(sort)

    return res.status(200).json(projects.map(project => project.toJSON()))
  },

  async createProject (req, res, next) {
    const project = new this.Projects(req.body)
    const newProject = await project.save()

    return res.status(200).json(newProject.toJSON())
  },

  async getProject (req, res) {
    const project = req.project

    return res.status(200).json(project.toJSON())
  },

  async putProject (req, res) {
    const project = Object.assign(req.project, { ...req.body })
    const newProject = await project.save()

    return res.status(200).json(newProject.toJSON())
  },

  async apply (req, res) {
    const userId = req.payload.id
    const user = await this.Users.findById(userId)

    if (!user) throw new NotFoundError()

    const project = req.project
    const projectId = project._id

    await user.applyForProject(projectId)
    await mailer.sendApplication(user, project)

    return res.status(200).json(user.toJSON())
  },

  async projectById (req, res, next, id) {
    const project = await this.Projects.findById(id)

    if (!project) throw new NotFoundError()

    req.project = project
    next()
  }
}
