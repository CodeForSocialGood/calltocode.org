import HttpError from './HttpError'

export default class RequestError extends HttpError {
  constructor (message = 'Bad request') {
    super()

    this.name = 'RequestError'
    this.message = message
    this.status = 400
  }
}
