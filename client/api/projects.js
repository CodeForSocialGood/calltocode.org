import apiRequest from './lib/apiRequest'

const projectsApiClient = {
  getAllProjects (apiOptions) {
    return apiRequest.get('/projects', apiOptions)
  },

  getRecentProjects (apiOptions, nrOfProjects) {
    const query = { quantity: nrOfProjects }
    return apiRequest.get('/projects/recent', apiOptions, query)
  },

  getAppliedProjects (apiOptions, projectsAppliedFor) {
    const query = { projectsAppliedFor }
    return apiRequest.get('/projects', apiOptions, query)
  },

  getOrgProjects (apiOptions, id) {
    const query = { organization: id }
    return apiRequest.get('/projects', apiOptions, query)
  },

  async createProject (apiOptions, name, causes, technologies, organization) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, causes, technologies, organization })
    }
    return fetch('/api/projects/', options)
  },

  async getPresignedUrlForProjectImage (apiOptions, imageName) {
    const query = { imageName }
    return apiRequest.get('/projects/presignedUrl', apiOptions, query)
  },

  async uploadImage (apiOptions, url, file) {
    return fetch(url, {
      method: 'PUT',
      body: file
    })
  },

  getProjectById (apiOptions, id) {
    return apiRequest.get('/projects/' + id, apiOptions, null)
  }
}

export default projectsApiClient
