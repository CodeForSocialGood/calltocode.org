export const defaultApiOptions = {}

export default function apiOptionsFromState (state) {
  if (!state) {
    return defaultApiOptions
  }

  const { auth, user } = state

  const apiOptions = {}

  if (auth && auth.authenticated && user && user.token) {
    apiOptions.token = user.token
  }

  return {
    ...defaultApiOptions,
    ...apiOptions
  }
}
