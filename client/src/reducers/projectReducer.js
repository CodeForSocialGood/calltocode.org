import {
  FETCHING_PROJECTS,
  RECEIVED_PROJECTS,
  FAILED_PROJECTS
} from '../actions/project/types'

const defaultState = {
  fetching: false,
  projects: []
}

export default function (state = defaultState, action) {
  const { type, payload } = action

  switch (type) {
    case FETCHING_PROJECTS:
      return { ...state, fetching: true }

    case RECEIVED_PROJECTS:
      return { ...state, fetching: false, projects: payload }

    case FAILED_PROJECTS:
      return { ...state, fetching: false }

    default:
      return state
  }
}
