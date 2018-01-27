import { UPDATE_USER } from './types'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import usersApiClient from '../../api/users'
import ApplyForProjectException from '../../exceptions/ApplyForProjectException'

export const updateUser = { type: UPDATE_USER }

export default class UserActionCreator {
  static applyForProject (project, user) {
    return async (dispatch, getState) => {
      try {
        const projectId = project.id
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const updatedUser = await usersApiClient.applyForProject(apiOptions, projectId)

        dispatch({
          ...updateUser,
          payload: updatedUser
        })
      } catch (e) {
        console.trace(e)
        throw new ApplyForProjectException(e.status)
      }
    }
  }
}
