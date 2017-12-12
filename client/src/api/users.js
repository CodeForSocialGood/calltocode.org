import bcrypt from 'bcryptjs'

import apiRequest from './lib/apiRequest'

const usersApiClient = {
  current (apiOptions) {
    return apiRequest.get('/user', apiOptions)
  },

  // TODO: get apiOptions through params (calling of usersApiClient.login
  // needs to be moved to AuthActionCreator)
  async login (email, password) {
    const apiOptions = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, origin: '/api', token: '' }

    const query = { email }
    const { salt } = await apiRequest.get('/users/getSalt', apiOptions, query)
    const hash = bcrypt.hashSync(password, salt)

    const body = { email, hash }
    return apiRequest.post('/users/login', apiOptions, body)
  },

  signup (apiOptions, user) {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(user.password, salt)

    const body = { user: { ...user, salt, hash } }
    return apiRequest.post('/users', apiOptions, body)
  },

  update (apiOptions, user) {
    const body = { user }
    return apiRequest.put('/user', apiOptions, body)
  }
}

export default usersApiClient
