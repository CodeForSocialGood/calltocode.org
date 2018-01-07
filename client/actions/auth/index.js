import { APP_LOAD, LOGIN, LOGOUT, FORGOT_PASSWORD } from './types'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import usersApiClient from '../../api/users'
import SignupException from '../../exceptions/SignupException'
import ForgotPasswordException from '../../exceptions/ForgotPasswordException'
import forgotPasswordApiClient from '../../api/forgotPassword'
import NewPasswordException from '../../exceptions/NewPasswordException'

export const appLoad = { type: APP_LOAD }
export const login = { type: LOGIN }
export const logout = { type: LOGOUT }
export const forgotPass = { type: FORGOT_PASSWORD }

export default class AuthActionCreator {
  static appLoad () {
    return async (dispatch, getState) => {
      try {
        const state = getState()
        const token = window.localStorage.getItem('jwt')
        const apiOptions = { ...apiOptionsFromState(state), token }

        const user = token ? await usersApiClient.current(apiOptions) : {}
        dispatch({
          ...appLoad,
          payload: user
        })
      } catch (e) {
        console.trace(e)
      }
    }
  }

  static login (user) {
    return dispatch => {
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
    return async (dispatch, getState) => {
      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const usertype = isOrganization ? 'contact' : 'volunteer'

        const user = await usersApiClient.signup(apiOptions, { usertype, email, password })
        dispatch(AuthActionCreator.login(user))
      } catch (e) {
        console.trace(e)
        throw new SignupException()
      }
    }
  }

  static sendValidationCode ({ email }) {
    return async (dispatch, getState) => {
      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const response = await forgotPasswordApiClient.sendValidationCode(apiOptions, email)
        if (response.status === 200) {
          dispatch({
            ...forgotPass
          })
        }
      } catch (e) {
        console.trace(e)
        throw new ForgotPasswordException()
      }
    }
  }

  static changePassword ({ email, password }) {
    return async dispatch => {
      const response = await usersApiClient.changePassword(email, password)
      if (response.status === 200) {
        const user = await response.json()
        dispatch(AuthActionCreator.login(user))
      } else {
        console.error(response.statusText)
        throw new NewPasswordException()
      }
    }
  }
}
