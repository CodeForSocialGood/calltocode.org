const userApiClient = {
  updateOppsAppliedFor (oppId, userId) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ oppId, userId })
    }

    return fetch('/opps', options)
  }
}

export default userApiClient
