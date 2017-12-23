const config = {
  accessToken: process.env.ROLLBAR_API_KEY,
  enabled: true,
  verbose: true,
  captureUncaught: true,
  captureUnhandledRejections: true,
  ...envConfig()
}

function envConfig () {
  switch (process.env.NODE_ENV) {
    case 'prod': return { environment: 'prod', reportLevel: 'error', verbose: false }
    case 'test': return { environment: 'test', reportLevel: 'warning' }
    default: return { enabled: false, captureUncaught: false, captureUnhandledRejections: false }
  }
}

module.exports = config
