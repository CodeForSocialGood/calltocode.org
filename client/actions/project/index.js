import {
  FETCHING_PROJECTS,
  RECEIVED_PROJECTS,
  FAILED_PROJECTS
} from './types'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import projectsApiClient from '../../api/projects'

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
    return (dispatch, getState) => {
      dispatch(ProjectActionCreator.fetching())

      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const projects = projectsApiClient.getAllProjects(apiOptions)
        dispatch(ProjectActionCreator.received(projects))
      } catch (e) {
        console.trace(e)
        dispatch(ProjectActionCreator.failed(e))
      }
    }
  }

  static fetchProfileProjects (user) {
    return (dispatch, getState) => {
      dispatch(ProjectActionCreator.fetching())

      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const projects = user.usertype === 'contact'
          ? projectsApiClient.getOrgProjects(apiOptions, user.organization)
          : projectsApiClient.getAppliedProjects(apiOptions, user.projectsAppliedFor)
        dispatch(ProjectActionCreator.received(projects))
      } catch (e) {
        console.trace(e)
        dispatch(ProjectActionCreator.failed(e))
      }
    }
  }

  static createProject(){
    console.log("In Project Action creator create project")
  }
}
