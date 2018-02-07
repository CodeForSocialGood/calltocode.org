import {
  DISABLE_LOGIN,
  ENABLE_LOGIN
} from './types'

export const disableLog = { type: DISABLE_LOGIN }
export const enableLog = { type: ENABLE_LOGIN }

export default class LoginActionCreator {
  static enableLogin () {
    return (dispatch) => dispatch(enableLog)
  }

  static disableLogin () {
    return (dispatch) => dispatch(disableLog)
  }
}
