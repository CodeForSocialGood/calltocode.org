import apiRequest from './lib/apiRequest'

const applicationsApiClient = {
  getVolunteerApplications (apiOptions, volunteerId) {
    const query = { volunteer: volunteerId }
    return apiRequest.get('/projects', apiOptions, query)
  },

  getProjectApplications (apiOptions, projectId) {
    const query = { project: projectId }
    return apiRequest.get('/applications', apiOptions, query)
  },

  createApplication (apiOptions, application) {
    const body = application
    return apiRequest.post('/applications', apiOptions, body)
  },

  acceptApplication (apiOptions, applicationId) {
    return apiRequest.post(`/applications/${applicationId}/accept`, apiOptions)
  },

  rejectApplication (apiOptions, applicationId) {
    return apiRequest.post(`/applications/${applicationId}/reject`, apiOptions)
  }
}

export default applicationsApiClient
