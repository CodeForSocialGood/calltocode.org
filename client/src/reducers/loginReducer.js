import { LOGIN } from '../actions/types'
import { browserHistory } from 'react-router'
import credentials from '../data/login.json'

export default function (state = false, action) {
  switch (action.type) {
    case LOGIN:
      return (action.payload.email === credentials.email && action.payload.password === credentials.password)
    default:
      return state
  }
}
