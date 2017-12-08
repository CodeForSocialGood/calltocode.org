const ProjectModel = require('../../database/models/Project')

const projectsController = {
  _init (Projects = ProjectModel) {
    this.Projects = Projects

    this.preloadProject = this.preloadProject.bind(this)
    this.getProjects = this.getProjects.bind(this)
    this.getProject = this.getProject.bind(this)
    return this
  },

  preloadProject (req, res, next, id) {
    this.Projects.findById(id).exec((err, project) => {
      if (err) {
        return res.sendStatus(500)
      }

      if (!project) {
        return res.sendStatus(404)
      }

      req.project = project

      return next()
    })
  },

  getProjects (req, res) {
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

    this.Projects.find(query).limit(limit).skip(offset).sort(sort).exec((err, projects) => {
      if (err) {
        return res.sendStatus(500)
      }

      return res.status(200).send(projects.map(project => project.toJSON()))
    })
  },

  getProject (req, res) {
    return res.status(200).send(req.project.toJSON())
  }
}

module.exports = projectsController
