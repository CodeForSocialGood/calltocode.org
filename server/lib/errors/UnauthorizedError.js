import HttpError from './HttpError'

export default class UnauthorizedError extends HttpError {
  constructor (message = 'Unauthorized') {
    super()

    this.name = 'UnauthorizedError'
    this.message = message
    this.status = 401
  }
}
