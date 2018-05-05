import apiRequest from './lib/apiRequest'

const applicationsApiClient = {
  getVolunteerApplications (apiOptions, volunteerId, status = 'pending') {
    const query = { volunteer: volunteerId, status }
    return apiRequest.get('/projects', apiOptions, query)
  },

  getProjectApplications (apiOptions, projectId, status = 'pending') {
    const query = { project: projectId, status }
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
  },

  getNotifications (apiOptions) {
    return apiRequest.get('/applications/notifications', apiOptions)
  },

  markAsSeenApplication (apiOptions, applicationId) {
    return apiRequest.post(`/applications/${applicationId}/markAsSeen`, apiOptions)
  }
}

export default applicationsApiClient
