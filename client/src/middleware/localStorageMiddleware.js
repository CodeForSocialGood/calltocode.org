import { LOGIN, LOGOUT } from '../actions/auth/types'

export default function localStorageMiddleware (store) {
  return next => action => {
    if (action.type === LOGIN && !action.error) {
      localStorage.setItem('jwt', action.payload.token)
    } else if (action.type === LOGOUT) {
      localStorage.removeItem('jwt')
    }

    next(action)
  }
}
