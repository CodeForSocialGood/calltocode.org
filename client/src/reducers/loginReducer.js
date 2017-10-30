import { LOGIN, LOGOUT } from '../actions/types'

const defaultState = {
  loggedIn: false,
  email: null
}

export default function (state = defaultState, { type, value }) {
  switch (type) {
    case LOGIN:
      return {...state, loggedIn: true, email: value}
    case LOGOUT:
      return defaultState
    default:
      return state
  }
}
