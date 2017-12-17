const Rollbar = require('rollbar')

const { rollbarConfig } = require('./config')
const { enabled, verbose } = rollbarConfig
const rollbar = new Rollbar(rollbarConfig)

const logger = {
  critical (error) {
    if (enabled) {
      rollbar.critical(error)
    } else if (verbose) {
      console.error.apply(console, arguments)
    }
  },
  error (error) {
    if (enabled) {
      rollbar.error(error)
    } else if (verbose) {
      console.error.apply(console, arguments)
    }
  },
  warn (warning) {
    if (enabled) {
      rollbar.warning(warning)
    } else if (verbose) {
      console.warn.apply(console, arguments)
    }
  },
  info (message) {
    if (enabled) {
      rollbar.info(message)
    } else if (verbose) {
      console.info.apply(console, arguments)
    }
  },
  debug (message) {
    if (enabled) {
      rollbar.debug(message)
    } else if (verbose) {
      console.log.apply(console, arguments)
    }
  },
  warning () { this.warn.apply(this.warn, arguments) },
  log () { this.debug.apply(this.debug, arguments) }
}

module.exports = logger
