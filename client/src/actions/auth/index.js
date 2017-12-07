import { APP_LOAD, LOGIN, LOGOUT } from './types'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import usersApiClient from '../../api/users'
// import SignupException from '../../exceptions/SignupException'

export const appLoad = { type: APP_LOAD }
export const login = { type: LOGIN }
export const logout = { type: LOGOUT }

export default class AuthActionCreator {
  static appLoad () {
    return async dispatch => {
      const token = window.localStorage.getItem('jwt')
      const apiOptions = { token }
      const user = token ? usersApiClient.current(apiOptions) : {}

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

    return async (dispatch, getState) => {
      const state = getState()
      const apiOptions = apiOptionsFromState(state)
      const user = usersApiClient.signup(apiOptions, { usertype, email, password })

      dispatch(AuthActionCreator.login(user))

      // const response = await signupApiClient.signup({ usertype, email, password })
      //
      // if (response.status === 200) {
      //   const user = await response.json()
      //
      //   dispatch(this.login(user))
      // }
      //
      // throw new SignupException()
    }
  }
}
