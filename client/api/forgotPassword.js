import apiRequest from './lib/apiRequest'

const forgotPasswordApiClient = {
  sendValidationCode (apiOptions, email) {
    const body = { email }
    return apiRequest.post('/forgot-password', apiOptions, body)
  },

  validateCode (apiOptions, email, code) {
    const body = { email, code }
    return apiRequest.post('/forgot-password/code', apiOptions, body)
  }
}

export default forgotPasswordApiClient
