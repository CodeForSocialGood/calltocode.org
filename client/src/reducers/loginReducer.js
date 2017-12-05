import {
  APP_LOAD,
  LOGIN,
  LOGOUT,
  GET_OPPS_APPLIED_FOR,
  APPLY_FOR_PROJECT
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

    case APPLY_FOR_PROJECT:
      const newUserOpps = [ ...state.opps, payload.oppAppliedFor ]
      return { ...state, user: payload.newUser, opps: newUserOpps }

    case GET_OPPS_APPLIED_FOR:
      return {...state, opps: payload}

    default:
      return state
  }
}
