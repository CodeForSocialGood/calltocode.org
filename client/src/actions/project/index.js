import {
  FETCHING_PROJECTS,
  RECEIVED_PROJECTS,
  FAILED_PROJECTS
} from './types'

import api from '../../api'

export const fetching = { type: FETCHING_PROJECTS }
export const received = { type: RECEIVED_PROJECTS }
export const failed = { type: FAILED_PROJECTS }

export default class ProjectActionCreator {
  static fetching () {
    return fetching
  }

  static received (projects) {
    return {
      ...received,
      payload: projects
    }
  }

  static failed (error) {
    return {
      ...failed,
      payload: error,
      error: true
    }
  }

  static fetchAllProjects () {
    return dispatch => {
      dispatch(ProjectActionCreator.fetching())

      try {
        const projects = api.project.all()
        dispatch(ProjectActionCreator.received(projects))
      } catch (e) {
        console.log(e)
        dispatch(ProjectActionCreator.failed(e))
      }
    }
  }

  static fetchProfileProjects (user) {
    return dispatch => {
      dispatch(ProjectActionCreator.fetching())

      try {
        const projects = user.usertype === 'contact'
          ? api.project.organization(user.organization)
          : api.project.applied(user.opportunitiesAppliedFor)
        dispatch(ProjectActionCreator.received(projects))
      } catch (e) {
        console.log(e)
        dispatch(ProjectActionCreator.failed(e))
      }
    }
  }
}
