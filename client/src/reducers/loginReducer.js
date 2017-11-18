import {
  LOGIN,
  LOGOUT,
  GET_OPPS_APPLIED_FOR,
  UPDATE_USER
} from '../actions/types'

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

    case UPDATE_USER:
      return {...state, user: payload}

    case GET_OPPS_APPLIED_FOR:
      return {...state, opps: payload}

    default:
      return state
  }
}
