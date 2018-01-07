function isPromise (v) {
  return v && typeof v.then === 'function'
}

export default function promiseMiddleware (store) {
  return next => action => {
    return isPromise(action.payload)
      ? action.payload.then(
        result => store.dispatch({ ...action, payload: result }),
        error => store.dispatch({ ...action, payload: error, error: true })
      )
      : next(action)
  }
}
