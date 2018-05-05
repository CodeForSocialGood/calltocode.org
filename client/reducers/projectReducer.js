import initialState from './initialState'
import * as actionTypes from '../actions/project/types'

export default function (state = initialState.projects, action) {
  const { type, payload } = action

  switch (type) {
    case actionTypes.FETCHING_PROJECTS:
      return { ...state, fetching: true }

    case actionTypes.RECEIVED_PROJECTS:
      const value = payload || {}
      if (value instanceof Array) {
        return {...state, fetching: false, projects: payload}
      } else {
        return {...state, fetching: false, project: payload}
      }

    case actionTypes.FAILED_PROJECTS:
      return { ...state, fetching: false }
    case actionTypes.CREATE_PROJECT_FAILED: {
      return {...state, error: {message: payload}}
    }

    case actionTypes.GET_RECENT_PROJECTS_START:
      return { ...state, recentProjects: { isLoading: true } }
    case actionTypes.GET_RECENT_PROJECTS_SUCCESS:
      return { ...state, recentProjects: { isLoading: false, projects: action.payload, error: null } }
    case actionTypes.GET_RECENT_PROJECTS_FAILED:
      return { ...state, recentProjects: { isLoading: false, projects: [], error: action.payload } }

    default:
      return state
  }
}
