const userApiClient = {
  updateUser (updatedUser) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updatedUser })
    }

    return fetch('/user', options)
  }
}

export default userApiClient
