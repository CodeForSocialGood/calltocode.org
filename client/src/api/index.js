const API_ROOT_URL = '/api'

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
    const res = await fetch(`${API_ROOT_URL}${url}`, { method, headers: setHeaders(), body })
    return res.json()
  },
  async put (url, body) {
    const method = 'PUT'
    const res = await fetch(`${API_ROOT_URL}${url}`, { method, headers: setHeaders(), body })
    return res.json()
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
  user,
  setToken
}
