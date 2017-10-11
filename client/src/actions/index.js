import { LOGIN, LOGOUT } from './types'
import signupApiClient from '../api/signup'
import SignupException from '../exceptions/SignupException'

function login ({ email }) {
  return {
    type: LOGIN,
    value: email
  }
}

function logout () {
  return {
    type: LOGOUT
  }
}

function signup ({ email, password }) {
  return async dispatch => {
    const response = await signupApiClient.signup({ email, password })
    if (response.status === 200) {
      return dispatch(login({ email }))
    }
    throw new SignupException()
  }
}

export {
  login,
  logout,
  signup
}
