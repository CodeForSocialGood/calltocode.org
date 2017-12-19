import apiRequest from './lib/apiRequest'

const emailApiClient = {
  send (apiOptions, project, email) {
    const body = { project, user: { email } }
    return apiRequest.post('/email', apiOptions, body)
  }
}

export default emailApiClient
