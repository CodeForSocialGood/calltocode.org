import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import applicationsApiClient from '../../api/applications'
import * as actionTypes from './types'

export default class ApplicationActionCreator {
  static getNotifications (user) {
    return (dispatch, getState) => {
      dispatch({type: actionTypes.FETCH_NOTIFICATIONS_START})
      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const applications = applicationsApiClient.getNotifications(apiOptions)
        dispatch({type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS, payload: applications})
      } catch (error) {
        dispatch({type: actionTypes.FETCH_NOTIFICATIONS_ERROR, payload: error, error: true})
      }
    }
  }

  static markAsSeen (applicationId) {
    return (dispatch, getState) => {
      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const application = applicationsApiClient.markAsSeenApplication(apiOptions, applicationId)
        dispatch({type: actionTypes.MARK_AS_SEEN_SUCCESS, payload: application})
      } catch (error) {
        dispatch({type: actionTypes.MARK_AS_SEEN_ERROR, payload: error, error: true})
      }
    }
  }

  static createApplication (project, user) {
    return (dispatch, getState) => {
      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const applicationToCreate = { project: project.id, volunteer: user.id }
        const application = applicationsApiClient.createApplication(apiOptions, applicationToCreate)
        dispatch({type: actionTypes.CREATE_APPLICATION_SUCCESS, payload: application})
      } catch (error) {
        dispatch({type: actionTypes.CREATE_APPLICATION_ERROR, payload: error, error: true})
      }
    }
  }
}
