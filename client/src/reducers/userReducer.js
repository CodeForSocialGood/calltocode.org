import { APP_LOAD, LOGIN, LOGOUT } from '../actions/auth/types'
import { UPDATE_USER } from '../actions/user/types'

const defaultState = {}

export default function (state = defaultState, action) {
  const { type, payload } = action

  switch (type) {
    case APP_LOAD:
    case LOGIN:
      return { ...state, ...payload }

    case LOGOUT:
      return defaultState

    case UPDATE_USER:
      return { ...state, ...payload }

    default:
      return state
  }
}
