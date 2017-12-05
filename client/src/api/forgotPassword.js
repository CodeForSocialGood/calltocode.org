const forgotPasswordApiClient = {
  sendValidationCode (email) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          email: email
        }
      })
    }

    return fetch('/forgot-password', options)
  }
}

export default forgotPasswordApiClient
