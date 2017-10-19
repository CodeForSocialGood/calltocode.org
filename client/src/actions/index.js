import { LOGIN, LOGOUT } from './types'
import signupApiClient from '../api/signup'
import SignupException from '../exceptions/SignupException'
import { SubmissionError } from 'redux-form'
import credentials from '../data/login'

function login (values) {
  if (values.email !== credentials.email) {
    throw new SubmissionError({
        email: `Email should be ${credentials.email}`,
        _error: 'Incorrect credentials, please try again!'
      })
  } else if (values.password !== credentials.password) {
    throw new SubmissionError({
        password: `Password should be ${credentials.password}`,
        _error: 'Incorrect credentials, please try again!'
      })
  } else {
      return {
        type: LOGIN,
        value: values.email
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
