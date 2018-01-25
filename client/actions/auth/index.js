import { APP_LOAD, LOGIN, LOGOUT, FAILED_LOGIN } from './types'

import apiOptionsFromState from '../../api/lib/apiOptionsFromState'
import usersApiClient from '../../api/users'
import SignupException from '../../exceptions/SignupException'
import NewPasswordException from '../../exceptions/NewPasswordException'
import { push } from 'react-router-redux'

export const appLoad = { type: APP_LOAD }
export const login = { type: LOGIN }
export const logout = { type: LOGOUT }

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

  static doLogin (email, password) {
    return async (dispatch, getState) => {
      let success = false
      try {
        const state = getState()
        const apiOptions = apiOptionsFromState(state)
        const user = await usersApiClient.login(apiOptions, email, password)
        if (!user.hasOwnProperty('error')) {
          dispatch(AuthActionCreator.login(user))
          success = true
        } else {
          dispatch({ type: FAILED_LOGIN, payload: user.error, error: true })
          success = false
        }
      } catch (error) {
        dispatch({ type: FAILED_LOGIN, payload: error, error: true })
        success = false
      }
      return success
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
        dispatch(push('/'))
      } catch (e) {
        console.trace(e)
        throw new SignupException()
      }
    }
  }

  static changePassword (email, password) {
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
