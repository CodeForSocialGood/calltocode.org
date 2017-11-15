import { LOGIN, LOGOUT } from './types'
import signupApiClient from '../api/signup'
import oppsApiClient from '../api/opportunities'
import SignupException from '../exceptions/SignupException'

function login ({ user }) {

  return async dispatch => {

    const response = await oppsApiClient.getOpps( user.opportunitiesAppliedFor )
    if (response.status === 200) {
      return response.json().then(opps => {

        dispatch({
          type: LOGIN,
          payload: { user, opps }
        })
      })
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
