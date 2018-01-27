import HttpError from './HttpError'

export default class ForbiddenError extends HttpError {
  constructor (message = 'Forbidden') {
    super()

    this.name = 'ForbiddenError'
    this.message = message
    this.status = 403
  }
}
