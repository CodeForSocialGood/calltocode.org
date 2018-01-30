import { SimulatedError } from './errors'

export function simulateDelay (delay = 0) {
  return (req, res, next) => {
    setTimeout(next, delay)
  }
}

export function simulateError (chance = 0) {
  return (req, res, next) => {
    if (Math.random() < chance) {
      throw new SimulatedError()
    }
    next()
  }
}
