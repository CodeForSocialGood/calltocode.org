import { UPDATE_USER } from './types'

import userApiClient from '../../api/user'

export const updateUser = { type: UPDATE_USER }

export default class UserActionCreator {
  static applyForProject (project, user) {
    const projectId = project._id

    return async (dispatch, getState) => {
      let updatedUser = { ...user }

      if (!user.opportunitiesAppliedFor.includes(projectId)) {
        const opportunitiesAppliedFor = [...user.opportunitiesAppliedFor, projectId]
        updatedUser = { ...user, opportunitiesAppliedFor }
      }

      const response = await userApiClient.updateOppsAppliedFor(projectId, user.id)
      if (response.status === 200) {
        dispatch({
          ...updateUser,
          payload: updatedUser
        })
      }
    }
  }
}
