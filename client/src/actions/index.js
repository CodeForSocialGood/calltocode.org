import { LOGIN, LOGOUT } from './types'
import signupApiClient from '../api/signup'
import SignupException from '../exceptions/SignupException'

function login ({ email, id }) {
  return {
    type: LOGIN,
    value: email,
    payload: {
      id: id
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
        .then(data => {
          dispatch(login({ email, id: data.id }))
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
