const bindFunctions = require('../../bindFunctions')
const ProjectModel = require('../../database/models/Project')

const projectsController = {
  _init (Projects = ProjectModel) {
    bindFunctions(this)

    this.Projects = Projects
    return this
  },

  getProjects (req, res, next) {
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

    this.Projects.find(query).limit(limit).skip(offset).sort(sort).then(projects => {
      return res.status(200).json(projects.map(project => project.toJSON()))
    }).catch(next)
  },

  getProject (req, res, next) {
    const id = req.params.project

    this.Projects.findById(id).then(project => {
      if (!project) {
        return res.status(404).json({ error: 'Project not found' })
      }

      return res.status(200).json(project.toJSON())
    }).catch(next)
  }
}

module.exports = projectsController
