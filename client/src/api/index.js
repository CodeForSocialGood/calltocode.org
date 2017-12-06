const API_ROOT_URL = ''

let token = null

const requests = {
  async del (url) {
    const method = 'DELETE'
    const res = await fetch(`${API_ROOT_URL}${url}`, { method, headers: setHeaders() })
    return res.json()
  },
  async get (url) {
    const method = 'GET'
    const res = await fetch(`${API_ROOT_URL}${url}`, { method, headers: setHeaders() })
    return res.json()
  },
  async post (url, body) {
    const method = 'POST'
    const res = await fetch(`${API_ROOT_URL}${url}`, { method, headers: setHeaders(), body: JSON.stringify(body) })
    return res.json()
  },
  async put (url, body) {
    const method = 'PUT'
    const res = await fetch(`${API_ROOT_URL}${url}`, { method, headers: setHeaders(), body: JSON.stringify(body) })
    return res.json()
  }
}

// TODO: project and user are temporary apiClients until the rest of
// this file is refactored into a util such as apiRequest.js
// this would be useful for reasons such as setting the headers.
// the headers are going to need the authorization token for server
// requests requiring authorization.
// AuthActionCreator.appLoad probably shouldn't have to set the token
// in here like it currently is doing.. maybe we can pull the token
// from the store
const project = {
  all () {
    return requests.get('/all-opps')
  },

  applied (projects) {
    return requests.post('/opps', { projects })
  },

  organization (id) {
    return requests.get(`/org-opps?organization=${id}`)
  }
}

const user = {
  current () {
    return requests.get('/user')
  }
}

function setHeaders () {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (token) {
    headers.authorization = `Token ${token}`
  }

  return headers
}

function setToken (_token) {
  token = _token
}

export default {
  project,
  user,
  setToken
}
