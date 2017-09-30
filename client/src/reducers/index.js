import { combineReducers } from 'redux'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
  loggedIn: loginReducer
})

export default rootReducer
