import loginReducer from './loginReducer'
import { reducer as formReducer } from 'redux-form'
import projectReducer from './projectReducer'

export default {
  login: loginReducer,
  form: formReducer,
  projects: projectReducer
}
