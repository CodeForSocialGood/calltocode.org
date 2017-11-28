import store from '..'

const emailApiClient = {
  send (projectInfo) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project: projectInfo,
        user: {
          email: store.getState().login.email
        }
      })
    }

    return fetch('/email', options)
  }
}

export default emailApiClient
