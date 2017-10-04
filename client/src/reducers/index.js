import loginReducer from './loginReducer'
import { reducer as formReducer } from 'redux-form'

export default {
  loggedIn: loginReducer,
  form: formReducer
}