import { FORGOT_PASSWORD } from '../actions/auth/types'

const defaultState = {
  email: ''
}

export default function (state = defaultState, action) {
  const { type, payload } = action

  switch (type) {
    case FORGOT_PASSWORD:
      return { ...state, email: payload }
    default:
      return state
  }
}
