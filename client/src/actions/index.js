import { LOGIN } from './types'

export function login (email, password) {
  return {
    type: LOGIN,
    payload: { email, password }
  }
}
