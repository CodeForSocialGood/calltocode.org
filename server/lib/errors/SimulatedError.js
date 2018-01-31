export default class SimulatedError extends Error {
  constructor (message = 'Simulated error') {
    super()

    this.name = 'SimulatedError'
    this.message = message
    this.status = 500
    Error.captureStackTrace(this, SimulatedError)
  }
}
