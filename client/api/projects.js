import apiRequest from './lib/apiRequest'

const projectsApiClient = {
  getAllProjects (apiOptions) {
    return apiRequest.get('/projects', apiOptions)
  },

  getAppliedProjects (apiOptions, projectsAppliedFor) {
    const query = { projectsAppliedFor }
    return apiRequest.get('/projects', apiOptions, query)
  },

  getOrgProjects (apiOptions, id) {
    const query = { organization: id }
    return apiRequest.get('/projects', apiOptions, query)
  },

  async createProject (name, causes, technologies, organization) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, causes, technologies, organization })
    }
    return fetch('/api/projects/', options)
  }
}

export default projectsApiClient
