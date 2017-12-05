import {
  APP_LOAD,
  LOGIN,
  LOGOUT,
  GET_OPPS_APPLIED_FOR,
  UPDATE_USER
} from '../actions/types'

const defaultUser = {
  email: '',
  password: '',
  opportunitiesAppliedFor: []
}

const defaultState = {
  loggedIn: !!localStorage.getItem('jwt'),
  user: defaultUser,
  opps: []
}

export default function (state = defaultState, { type, payload }) {
  switch (type) {
    case APP_LOAD:
      return {...state, appLoaded: true, user: payload ? payload.user : defaultUser}

    case LOGIN:
      return {...state, loggedIn: true, user: payload.user, opps: payload.opps}

    case LOGOUT:
      return {...defaultState, loggedIn: false}

    case UPDATE_USER:
      return {...state, user: payload}

    case GET_OPPS_APPLIED_FOR:
      return {...state, opps: payload}

    default:
      return state
  }
}
