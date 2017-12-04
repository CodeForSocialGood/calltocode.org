import { ALL_OPPS, PROFILE_OPPS } from '../actions/project/types'

const defaultState = {
  projects: []
}

export default function (state = defaultState, action) {
  const { type, payload } = action

  switch (type) {
    case ALL_OPPS:
    case PROFILE_OPPS:
      return { ...state, projects: payload }

    default:
      return state
  }
}
