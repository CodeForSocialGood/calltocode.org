import {
  LOGIN,
  LOGOUT,
  POPULATE_OPPS,
  GET_OPPS_APPLIED_FOR,
  APPLY_FOR_PROJECT,
  FORGOT_PASSWORD
} from './types'
import signupApiClient from '../api/signup'
import oppsApiClient from '../api/opportunities'
import userApiClient from '../api/user'
import SignupException from '../exceptions/SignupException'
import forgotPasswordApiClient from '../api/forgotPassword'
import ApplyForProjectException from '../exceptions/ApplyForProjectException'

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

function applyForProject (project, user) {
  const projectId = project._id

  return async (dispatch, getState) => {
    let updatedUser = { ...user }

    if (user.opportunitiesAppliedFor.indexOf(projectId) === -1) {
      const opportunitiesAppliedFor = [...user.opportunitiesAppliedFor, projectId]
      updatedUser = { ...user, opportunitiesAppliedFor }
    }

    const userResponse = await userApiClient.updateUser(updatedUser)
    const oppResponse = await oppsApiClient.getOpp(projectId)

    if (userResponse.status === 200 && oppResponse.status === 200) {
      const newUser = await userResponse.json()
      const oppAppliedFor = await oppResponse.json()
      return dispatch({
        type: APPLY_FOR_PROJECT,
        payload: { newUser, oppAppliedFor }
      })
    }
    throw new ApplyForProjectException(userResponse.status, oppResponse.status)
  }
}

function getOppsAppliedFor (user) {
  return async dispatch => {
    const response = await oppsApiClient.getOppsAppliedFor(user.opportunitiesAppliedFor)
    if (response.status === 200) {
      const opps = await response.json()
      dispatch({
        type: GET_OPPS_APPLIED_FOR,
        payload: opps
      })
    }
  }
}

function populateOpps () {
  return async dispatch => {
    const response = await oppsApiClient.getAllOpps()
    if (response.status === 200) {
      const opps = await response.json()
      dispatch({
        type: POPULATE_OPPS,
        payload: opps
      })
    }
  }
}

function sendValidationCode ({email}) {
  return async dispatch => {
    const response = await forgotPasswordApiClient.sendValidationCode(email)
    if (response.status === 200) {
      dispatch({
        type: FORGOT_PASSWORD
      })
    }
    throw new SignupException()
  }
}

export {
  login,
  logout,
  signup,
  populateOpps,
  applyForProject,
  getOppsAppliedFor,
  sendValidationCode
}
