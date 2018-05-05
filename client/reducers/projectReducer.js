import initialState from './initialState'
import {
  FETCHING_PROJECTS,
  RECEIVED_PROJECTS,
  FAILED_PROJECTS,
  CREATE_PROJECT_FAILED
} from '../actions/project/types'

export default function (state = initialState.projects, action) {
  const { type, payload } = action

  switch (type) {
    case FETCHING_PROJECTS:
      return { ...state, fetching: true }

    case RECEIVED_PROJECTS:
      const value = payload || {}
      if (value instanceof Array) {
        return {...state, fetching: false, projects: payload}
      } else {
        return {...state, fetching: false, project: payload}
      }

    case FAILED_PROJECTS:
      return { ...state, fetching: false }
    case CREATE_PROJECT_FAILED: {
      return {...state, error: {message: payload}}
    }

    default:
      return state
  }
}
