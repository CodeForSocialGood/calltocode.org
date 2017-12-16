const ProjectModel = require('../../database/models/Project')

const projectsController = {
  _init (Projects = ProjectModel) {
    this.Projects = Projects

    this.getProjects = this.getProjects.bind(this)
    this.getProject = this.getProject.bind(this)
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

  getProject (req, res) {
    const id = req.params.project

    this.Projects.findById(id).exec((err, project) => {
      if (err) {
        return res.sendStatus(500)
      }

      if (!project) {
        return res.sendStatus(404)
      }

      return res.status(200).send(project.toJSON())
    })
  }
}

module.exports = projectsController
