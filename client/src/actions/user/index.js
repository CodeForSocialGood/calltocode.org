import { UPDATE_USER } from './types'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import emailApiClient from '../../api/email'
import usersApiClient from '../../api/users'

export const updateUser = { type: UPDATE_USER }

export default class UserActionCreator {
  static updating () {}

  static updated () {}

  static failed () {}

  static applyForProject (project, user) {
    return async (dispatch, getState) => {
      const projectId = project.id
      let updatedUser = { ...user }

      if (!user.projectsAppliedFor.includes(projectId)) {
        const projectsAppliedFor = [...user.projectsAppliedFor, projectId]
        updatedUser = { ...user, projectsAppliedFor }
      }

      const state = getState()
      const apiOptions = apiOptionsFromState(state)
      const receivedUser = usersApiClient.update(apiOptions, updatedUser)
      emailApiClient.send(apiOptions, project, user.email)

      dispatch({
        ...updateUser,
        payload: receivedUser
      })
    }
  }
}
