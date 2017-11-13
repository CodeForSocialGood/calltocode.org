import { LOGIN, LOGOUT } from './types'
import signupApiClient from '../api/signup'
import SignupException from '../exceptions/SignupException'

function login ({ user }) {
  return {
    type: LOGIN,
    payload: {
      user: user
    }
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
      return response.json()
        .then(user => {
          dispatch(login(user))
        })
    }
    throw new SignupException()
  }
}

export {
  login,
  logout,
  signup
}
