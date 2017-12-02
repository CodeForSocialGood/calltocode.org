import { UPDATE_USER } from './types'

import userApiClient from '../api/user'

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

export {
  applyForProject
}
