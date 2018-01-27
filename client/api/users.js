import bcrypt from 'bcryptjs'

import apiRequest from './lib/apiRequest'

const usersApiClient = {
  current (apiOptions) {
    return apiRequest.get('/users/current', apiOptions)
  },

  update (apiOptions, fields) {
    const body = { ...fields }
    return apiRequest.put('/users/current', apiOptions, body)
  },

  async login (apiOptions, email, password) {
    const query = { email }
    const { salt } = await apiRequest.get('/users/salt', apiOptions, query)
    const hash = bcrypt.hashSync(password, salt)

    const body = { email, hash }
    return apiRequest.post('/users/login', apiOptions, body)
  },

  signup (apiOptions, user) {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(user.password, salt)

    const body = { ...user, salt, hash }
    return apiRequest.post('/users', apiOptions, body)
  },

  applyForProject (apiOptions, projectId) {
    return apiRequest.post(`/users/apply/${projectId}`, apiOptions)
  },

  createCode (apiOptions, email) {
    const body = { email }
    return apiRequest.post('/users/password/code', apiOptions, body)
  },

  validateCode (apiOptions, email, code) {
    const body = { email, code }
    return apiRequest.post('/users/password/code/validate', apiOptions, body)
  },

  changePassword (email, password) {
    const { salt, hash } = getSaltHash(password)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, salt, hash })
    }

    return fetch('/api/users/password', options)
  }
}

function getSaltHash (password) {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return { salt, hash }
}

export default usersApiClient
