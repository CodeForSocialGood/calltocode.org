const signupApiClient = {
  signup (user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    }

    return fetch('/signup', options)
  }
}

export default signupApiClient
