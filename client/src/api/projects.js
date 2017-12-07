import apiRequest from './lib/apiRequest'

const projectsApiClient = {
  all (apiOptions) {
    return apiRequest.get('/projects', apiOptions)
  },

  applied (apiOptions, projectsAppliedFor) {
    const query = { projectsAppliedFor }
    return apiRequest.get('/projects', apiOptions, query)
  },

  organization (apiOptions, id) {
    const query = { organization: id }
    return apiRequest.get('/projects', apiOptions, query)
  }
}

export default projectsApiClient
