import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  loggedIn: loginReducer,
  form: formReducer
})

export default rootReducer
