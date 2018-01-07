import apiRequest from './lib/apiRequest'

const forgotPasswordApiClient = {
  sendValidationCode (apiOptions, email) {
    const body = { email: email }
    return apiRequest.post('/forgot-password', apiOptions, body)
  },

  validateCode (apiOptions, email, code) {
    const body = { email: email, code: code }
    return apiRequest.post('/forgot-password/code', apiOptions, body)
  }
}

export default forgotPasswordApiClient
