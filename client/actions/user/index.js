import { UPDATE_USER } from './types'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import emailApiClient from '../../api/email'
import usersApiClient from '../../api/users'
import ApplyForProjectException from '../../exceptions/ApplyForProjectException'

export const updateUser = { type: UPDATE_USER }

export default class UserActionCreator {
  static applyForProject (project, user) {
    return (dispatch, getState) => {
      try {
        const projectId = project.id
        const projectsAppliedFor = user.projectsAppliedFor

        if (!user.projectsAppliedFor.includes(projectId)) projectsAppliedFor.push(projectId)

        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const updatedUser = usersApiClient.update(apiOptions, { projectsAppliedFor })
        emailApiClient.send(apiOptions, project, user.email)

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
