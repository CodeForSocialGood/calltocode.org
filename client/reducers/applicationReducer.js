import initialState from './initialState'
import * as actionTypes from '../actions/application/types'

export default function (state = initialState.applications, action) {
  switch (action.type) {
    case actionTypes.FETCH_NOTIFICATIONS_START:
      return { ...state, fetching: true }
    case actionTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return { ...state, fetching: false, applications: action.payload }
    case actionTypes.FETCH_NOTIFICATIONS_ERROR:
      return { ...state, fetching: false }
    default: return state
  }
}
