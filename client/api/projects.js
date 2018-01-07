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

  async createProject(name){
    console.log("In Client api")
    console.log("Name :"+name);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    }

    return await fetch('/api/projects/createproject', options)
  }
}

export default projectsApiClient
