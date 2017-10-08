import { LOGIN, SIGNUP } from '../actions/types'

const defaultState = {
  loggedIn: false,
  user: null
}

export default function (state = defaultState, { type, value }) {
  switch (type) {
    case LOGIN:
      return {...state, loggedIn: true, user: value}
    case SIGNUP:
      return {...state, loggedIn: true, user: value}
    default:
      return state
  }
}
