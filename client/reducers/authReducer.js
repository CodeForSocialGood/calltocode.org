import initialState from './initialState'
import { APP_LOAD, LOGIN, LOGOUT } from '../actions/auth/types'

export default function (state = initialState.auth, action) {
  const { type, payload } = action

  switch (type) {
    case APP_LOAD:
    case LOGIN:
      return { ...state, authenticated: !!payload.token }

    case LOGOUT:
      return initialState

    default:
      return state
  }
}
