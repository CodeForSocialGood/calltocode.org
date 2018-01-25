export default class HttpError extends Error {
  constructor () {
    super()

    this.name = 'HttpError'
    Error.captureStackTrace(this, HttpError)
  }
}
