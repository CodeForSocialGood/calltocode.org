import bcrypt from 'bcryptjs'

import apiRequest from './lib/apiRequest'

const usersApiClient = {
  current (apiOptions) {
    return apiRequest.get('/users/current', apiOptions)
  },

  // TODO: use apiRequest and get apiOptions through params (calling of
  // usersApiClient.login needs to be moved to AuthActionCreator)
  async login (email, password) {
    const apiOptions = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, origin: '/api', token: '' }

    const query = { email }
    const { salt } = await apiRequest.get('/users/getSalt', apiOptions, query)
    const hash = bcrypt.hashSync(password, salt)

    const body = { email, hash }
    // return apiRequest.post('/users/login', apiOptions, body)

    const options = {
      method: 'POST',
      headers: apiOptions.headers,
      body: JSON.stringify(body)
    }

    return fetch('/api/users/login', options)
  },

  signup (apiOptions, user) {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(user.password, salt)

    const body = { user: { ...user, salt, hash } }
    return apiRequest.post('/users', apiOptions, body)
  },

  changePassword (email, password) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }

    return fetch('/api/users/new-password', options)
  },

  update (apiOptions, user) {
    const body = { user }
    return apiRequest.put('/user', apiOptions, body)
  }
}

export default usersApiClient
