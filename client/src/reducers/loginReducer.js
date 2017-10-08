import { LOGIN, SIGNUP } from '../actions/types'

const defaultState = {
  loggedIn: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOGIN:
      return {...state, loggedIn: true}
    case SIGNUP:
      return {...state, loggedIn: true}
    default:
      return state
  }
}
