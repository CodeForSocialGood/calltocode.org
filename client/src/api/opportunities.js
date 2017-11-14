const oppsApiClient = {
  getOpps (opportunitiesAppliedFor) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ opportunitiesAppliedFor })
    }

    return fetch('/api/opps', options)
  }
}

export default oppsApiClient
