import bindFunctions from '../../lib/bindFunctions'
import ProjectModel from '../../database/models/Project'
import { NotFoundError } from '../../lib/errors'

export default {
  _init (Projects = ProjectModel) {
    bindFunctions(this)

    this.Projects = Projects
    return this
  },

  async getProjects (req, res, next) {
    const query = {}
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

  async projectById (req, res, next, id) {
    const project = await this.Projects.findById(id)

    if (!project) throw new NotFoundError()

    req.project = project
    next()
  }
}
