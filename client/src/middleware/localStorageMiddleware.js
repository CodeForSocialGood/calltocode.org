import { LOGIN, LOGOUT } from '../actions/types'

function localStorageMiddleware (store) {
  return next => action => {
    if (action.type === LOGIN && !action.error) {
      localStorage.setItem('jwt', action.payload.user.token)
    } else if (action.type === LOGOUT) {
      localStorage.removeItem('jwt')
    }

    next(action)
  }
}

export default localStorageMiddleware
