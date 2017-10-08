import { LOGIN, SIGNUP } from './types'

function login () {
  return {
    type: LOGIN
  }
}

function signup () {
  return {
    type: SIGNUP
  }
}


export {
  login,
  signup
}
