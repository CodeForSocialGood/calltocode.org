import apiRequest from './lib/apiRequest'

const forgotPasswordApiClient = {
  sendValidationCode (apiOptions, email) {
    const body = { email: email }
    return apiRequest.post('/forgot-password', apiOptions, body)
  }
}

export default forgotPasswordApiClient
