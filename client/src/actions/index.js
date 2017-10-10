import { LOGIN, SIGNUP, LOGOUT } from './types'

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

function signup ({ email }) {
  return {
    type: SIGNUP,
    value: email
  }
}

export {
  login,
  logout,
  signup
}
