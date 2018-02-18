import authReducer from './authReducer'
import commonReducer from './commonReducer'
import { reducer as formReducer } from 'redux-form'
import projectReducer from './projectReducer'
import userReducer from './userReducer'
import applicationReducer from './applicationReducer'

export default {
  auth: authReducer,
  common: commonReducer,
  form: formReducer,
  project: projectReducer,
  user: userReducer,
  application: applicationReducer
}
