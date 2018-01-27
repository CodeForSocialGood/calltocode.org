import HttpError from './HttpError'

export default class NotFoundError extends HttpError {
  constructor (message = 'Not found error') {
    super()

    this.name = 'NotFoundError'
    this.message = message
    this.status = 404
  }
}
