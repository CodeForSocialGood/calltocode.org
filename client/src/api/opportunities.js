const oppsApiClient = {
  getOppsAppliedFor (opportunitiesAppliedFor) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ opportunitiesAppliedFor })
    }

    return fetch('/opps', options)
  },

  getAllOpps () {
    const options = {
      method: 'GET'
    }

    return fetch('/all-opps', options)
  },

  getOrganizationOpps (organization) {
    const options = {
      method: 'GET'
    }

    return fetch(`/org-opps?organization=${organization}`, options)
  }
}

export default oppsApiClient
