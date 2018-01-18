async function apiRequest (apiOptions, options) {
  const { headers, origin, token } = apiOptions
  const { url, method, body, query } = options

  const qs = getQueryString(query)
  const _url = `${origin}${url}${qs}`
  const _method = method.toUpperCase()
  const _headers = token
    ? { ...headers, Authorization: `Token ${token}` }
    : headers
  const _body = ['POST', 'PUT'].includes(_method)
    ? JSON.stringify(body)
    : undefined

  const res = await fetch(_url, { method: _method, headers: _headers, body: _body })

  if (!res.ok) {
    // TODO: possibly handle errors here. could throw a ResponseError
    console.log('fetch errored.')
    console.log(res)
  }

  const contentType = res.headers.get('Content-Type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return res.json()
  }
  return res
}

function getQueryString (query = {}) {
  const encode = encodeURIComponent
  const keys = Object.keys(query)

  return keys.length > 0
    ? '?' + keys.map(k => encode(k) + '=' + encode(query[k])).join('&')
    : ''
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
