const API_ROOT_URL = '/api'

async function apiRequest (apiOptions, options) {
  const { token } = apiOptions
  const { url, method, body, query } = options

  const _query = getQueryString(query)
  const _url = `${API_ROOT_URL}${url}${_query}`
  const _method = method.toUpperCase()
  const _headers = getHeaders(token)
  const _body = ['POST', 'PUT'].includes(_method)
    ? JSON.stringify(body)
    : undefined

  const result = await fetch(_url, { method: _method, headers: _headers, body: _body })
  return result.json()
}

function getQueryString (query = {}) {
  const encode = encodeURIComponent
  const keys = Object.keys(query)

  return keys.length > 0
    ? '?' + keys.map(k => encode(k) + '=' + encode(query[k])).join('&')
    : ''
}

function getHeaders (token) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (token) {
    headers.Authorization = `Token ${token}`
  }

  return headers
}

export default {
  del (url, apiOptions, query) {
    const method = 'DELETE'
    return apiRequest(apiOptions, { url, method, query })
  },
  get (url, apiOptions, query) {
    const method = 'GET'
    return apiRequest(apiOptions, { url, method, query })
  },
  post (url, apiOptions, body) {
    const method = 'POST'
    return apiRequest(apiOptions, { url, method, body })
  },
  put (url, apiOptions, body) {
    const method = 'PUT'
    return apiRequest(apiOptions, { url, method, body })
  }
}
