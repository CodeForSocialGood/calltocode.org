import { LOGIN, LOGOUT } from './types'

import oppsApiClient from '../api/opportunities'
import signupApiClient from '../api/signup'
import SignupException from '../exceptions/SignupException'

function login (user) {
  return async dispatch => {
    const response = user.usertype === 'contact'
      ? await oppsApiClient.getOrganizationOpps(user.organization)
      : await oppsApiClient.getOppsAppliedFor(user.opportunitiesAppliedFor)

    if (response.status === 200) {
      const opps = await response.json()

      dispatch({
        type: LOGIN,
        payload: { user, opps }
      })
    }
  }
}

function logout () {
  return {
    type: LOGOUT
  }
}

function signup ({ email, password, isOrganization }) {
  const usertype = isOrganization ? 'contact' : 'volunteer'

  return async dispatch => {
    const response = await signupApiClient.signup({ usertype, email, password })
    if (response.status === 200) {
      const { user } = await response.json()

      dispatch(login(user))
    }
    throw new SignupException()
  }
}

export {
  login,
  logout,
  signup
}
