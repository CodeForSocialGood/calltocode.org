import {
  LOGIN,
  LOGOUT,
  POPULATE_OPPS,
  GET_OPPS_APPLIED_FOR,
  UPDATE_USER
} from './types'
import signupApiClient from '../api/signup'
import oppsApiClient from '../api/opportunities'
import userApiClient from '../api/user'
import SignupException from '../exceptions/SignupException'

function login ({ user }) {
  return async dispatch => {
    const response = await oppsApiClient.getOppsAppliedFor(user.opportunitiesAppliedFor)
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

function signup ({ email, password }) {
  return async dispatch => {
    const response = await signupApiClient.signup({ email, password })
    if (response.status === 200) {
      const user = await response.json()
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

    const response = await userApiClient.updateOppsAppliedFor(projectId, user.id)
    if (response.status === 200) {
      dispatch({
        type: UPDATE_USER,
        payload: updatedUser
      })
    }
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

export {
  login,
  logout,
  signup,
  populateOpps,
  applyForProject,
  getOppsAppliedFor
}
