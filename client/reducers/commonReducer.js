import initialState from './initialState'
import { APP_LOAD } from '../actions/auth/types'

export default function (state = initialState.common, action) {
  const { type } = action

  switch (type) {
    case APP_LOAD:
      return { ...state, appLoaded: true }

    default:
      return state
  }
}
