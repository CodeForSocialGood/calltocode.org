import { LOGIN } from '../actions/types'
import { browserHistory } from 'react-router'
import credentials from '../data/login.json'

export default function (state = false, action) {
  switch (action.type) {
    case LOGIN:
      const ret = (action.payload.email === credentials.email && action.payload.password === credentials.password)
      if (ret) {
        BrowserHistory
      }
      return ret
    default:
      return state
  }
}
