const loginApiClient = {
  login (email, password) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }

    return fetch('/login', options)
  }
}

export default loginApiClient
