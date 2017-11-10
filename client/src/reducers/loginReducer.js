import { LOGIN, LOGOUT } from '../actions/types'

const defaultState = {
  loggedIn: false,
  email: null,
  id: null
}

export default function (state = defaultState, { type, value, payload }) {
  switch (type) {
    case LOGIN:
      return {...state, loggedIn: true, email: value, id: payload.id}
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}
