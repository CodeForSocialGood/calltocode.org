import Rollbar from 'rollbar'

import { rollbarConfig } from '../config'

const rollbarLogger = new Rollbar(rollbarConfig)
const localLogger = console

function handleLog (rollbarLevel = 'debug', localLevel = rollbarLevel) {
  return function () {
    if (process.env.SILENT) return

    if (rollbarConfig.enabled) {
      rollbarLogger[rollbarLevel](...arguments)
    } else if (rollbarConfig.verbose) {
      localLogger[localLevel](...arguments)
    }
  }
}

export default {
  critical: handleLog('critical', 'error'),
  error: handleLog('error'),
  warn: handleLog('warn'),
  info: handleLog('info'),
  debug: handleLog('debug'),
  log: handleLog('log')
}
