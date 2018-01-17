import initialState from './initialState'
import { APP_LOAD, LOGIN, LOGOUT, LOGIN_FAILED } from '../actions/auth/types'

export default function (state = initialState.auth, action) {
  const { type, payload } = action

  switch (type) {
    case APP_LOAD:
    case LOGIN:
      return { ...state, authenticated: !!payload.token }

    case LOGOUT:
      return initialState
    case LOGIN_FAILED:
      return { ...state, error: action.error }
    default:
      return state
  }
}
