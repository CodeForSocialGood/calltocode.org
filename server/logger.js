const Rollbar = require('rollbar')

const { rollbarConfig } = require('./config')
const rollbar = new Rollbar(rollbarConfig)

const logger = {
  // Forward these errors to rollbar, verbose option decides to log locally
  critical (error) { rollbar.critical(error) },
  error (error) { rollbar.error(error) },
  warn (warning) { rollbar.warning(warning) },
  // These will never report to rollbar, manually check verbose option
  info (...args) { if (rollbarConfig.verbose) { console.info.apply(console, args) } },
  debug (...args) { if (rollbarConfig.verbose) { console.log.apply(console, args) } },
  log (...args) { this.debug.apply(this.debug, args) }
}

module.exports = logger
