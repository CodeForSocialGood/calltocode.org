function send (projectInfo) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      project: projectInfo,
      user: {
        email: 'kevin@email.com' // TODO: default for now
      }
    })
  }

  fetch('/email', options)
}

export default {
  send
}
