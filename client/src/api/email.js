import apiRequest from './lib/apiRequest'

const emailApiClient = {
  send (apiOptions, project, email) {
    // TODO: fix this by supplying server emailController the sendgrid api key
    const body = { project, user: { email } }
    return apiRequest.post('/email', apiOptions, body)
  }
}

export default emailApiClient
