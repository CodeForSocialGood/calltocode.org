import { LOGIN } from './types'

export function login (email, password) {
  console.log('login()')
  return {
    type: LOGIN,
    payload: { email, password }
  }
}
