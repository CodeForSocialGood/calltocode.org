import { APP_LOAD, LOGIN, LOGOUT } from './types'

import api from '../../api'
import signupApiClient from '../../api/signup'
import SignupException from '../../exceptions/SignupException'

export const appLoad = { type: APP_LOAD }
export const login = { type: LOGIN }
export const logout = { type: LOGOUT }

export default class AuthActionCreator {
  static appLoad () {
    return async dispatch => {
      const token = window.localStorage.getItem('jwt')
      api.setToken(token)
      const user = token ? api.user.current() : {}

      dispatch({
        ...appLoad,
        payload: user
      })
    }
  }

  static login (user) {
    return async dispatch => {
      dispatch({
        ...login,
        payload: user
      })
    }
  }

  static logout () {
    return logout
  }

  static signup ({ email, password, isOrganization }) {
    const usertype = isOrganization ? 'contact' : 'volunteer'

    return async dispatch => {
      const response = await signupApiClient.signup({ usertype, email, password })

      if (response.status === 200) {
        const user = await response.json()

        dispatch(this.login(user))
      }

      throw new SignupException()
    }
  }
}
