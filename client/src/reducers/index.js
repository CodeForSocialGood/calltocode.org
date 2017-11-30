import { reducer as formReducer } from 'redux-form'
import loginReducer from './loginReducer'
import projectReducer from './projectReducer'

export default {
  form: formReducer,
  login: loginReducer,
  projects: projectReducer
}
