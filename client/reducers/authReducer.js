import { APP_LOAD, LOGIN, LOGOUT, FORGOT_PASSWORD } from '../actions/auth/types'

const defaultState = {
  authenticated: false
}

export default function (state = defaultState, action) {
  const { type, payload } = action

  switch (type) {
    case APP_LOAD:
    case LOGIN:
      return { ...state, authenticated: !!payload.token }

    case LOGOUT:
    case FORGOT_PASSWORD:
      return defaultState

    default:
      return state
  }
}
