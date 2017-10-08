import { LOGIN, SIGNUP } from './types'

function login ({ email }) {
  return {
    type: LOGIN,
    value: email
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
  signup
}
