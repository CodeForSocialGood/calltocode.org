import { APP_LOAD } from '../actions/auth/types'

const defaultState = {
  appLoaded: false,
  appName: 'calltocode'
}

export default function (state = defaultState, action) {
  const { type } = action

  switch (type) {
    case APP_LOAD:
      return { ...state, appLoaded: true }

    default:
      return state
  }
}
