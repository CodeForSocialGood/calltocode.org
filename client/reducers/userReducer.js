import initialState from './initialState'
import { APP_LOAD, LOGIN, LOGOUT } from '../actions/auth/types'
import { UPDATE_USER } from '../actions/user/types'

export default function (state = initialState.users, action) {
  const { type, payload } = action

  switch (type) {
    case APP_LOAD:
    case LOGIN:
      return { ...state, ...payload }

    case LOGOUT:
      return initialState.users

    case UPDATE_USER:
      return { ...state, ...payload }

    default:
      return state
  }
}
