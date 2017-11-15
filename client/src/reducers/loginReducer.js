import { LOGIN, LOGOUT } from '../actions/types'

const defaultState = {
  loggedIn: false,
  user: {},
  opps: []
}

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case LOGIN:
      return {...state, loggedIn: true, user: payload.user, opps: payload.opps}
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}
