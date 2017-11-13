import { LOGIN, LOGOUT } from '../actions/types'

const defaultState = {
  loggedIn: false,
  user: {}
}

export default function (state = defaultState, { type, value, payload }) {
  switch (type) {
    case LOGIN:
      return {...state, loggedIn: true, user: payload.user }
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}
