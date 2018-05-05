import * as actionTypes from './types'
import { push } from 'react-router-redux'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import projectsApiClient from '../../api/projects'

export const fetching = { type: actionTypes.FETCHING_PROJECTS }
export const received = { type: actionTypes.RECEIVED_PROJECTS }
export const failed = { type: actionTypes.FAILED_PROJECTS }

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

  static fetchProjectById (id) {
    console.log('show applications 3')
    return (dispatch, getState) => {
      dispatch(ProjectActionCreator.fetching())

      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const project = projectsApiClient.getProjectById(apiOptions, id)
        dispatch(ProjectActionCreator.received(project))
      } catch (e) {
        console.trace(e)
        dispatch(ProjectActionCreator.failed())
      }
    }
  }

  static async uploadImage (file, apiOptions) {
    const filename = file.name.replace(/(\.[\w\d_-]+)$/i, Date.now() + '$1')
    const url = await projectsApiClient.getPresignedUrlForProjectImage(apiOptions, filename)
    await projectsApiClient.uploadImage(apiOptions, url, file)
    return filename
  }

  static createProject (projectName, causes, technologies, organization, file) {
    return async (dispatch, getState) => {
      dispatch({type: actionTypes.CREATE_PROJECT_START})

      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const filename = await ProjectActionCreator.uploadImage(file, apiOptions)
        await projectsApiClient.createProject(apiOptions, projectName, causes,
          technologies, organization, filename)
        dispatch({type: actionTypes.CREATE_PROJECT_SUCCESS})
        dispatch(push('/'))
      } catch (e) {
        console.trace(e)
        dispatch({
          type: actionTypes.CREATE_PROJECT_FAILED,
          payload: e,
          error: true})
      }
    }
  }
  static getRecentProjects (nrOfProjects) {
    return async (dispatch, getState) => {
      dispatch({type: actionTypes.GET_RECENT_PROJECTS_START})

      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const projects = await projectsApiClient.getRecentProjects(apiOptions, nrOfProjects)
        dispatch({type: actionTypes.GET_RECENT_PROJECTS_SUCCESS, payload: projects})
      } catch (e) {
        console.trace(e)
        dispatch({
          type: actionTypes.GET_RECENT_PROJECTS_FAILED,
          payload: e,
          error: true})
      }
    }
  }
}
