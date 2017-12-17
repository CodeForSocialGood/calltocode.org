const Rollbar = require('rollbar')

const { rollbarConfig } = require('./config')
const rollbar = new Rollbar(rollbarConfig)

const logger = {
  critical: handleLog('critical', 'error'),
  error: handleLog('error'),
  warn: handleLog('warn'),
  info: handleLog('info'),
  debug: handleLog('debug'),
  log: handleLog('log')
}

function handleLog (rollbarLevel, localLevel = rollbarLevel) {
  return function (message) {
    if (rollbarConfig.enabled) {
      rollbar[rollbarLevel](message)
    } else if (rollbarConfig.verbose) {
      console[localLevel](...arguments)
    }
  }
}

module.exports = logger
