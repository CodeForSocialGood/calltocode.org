const seleniumServer = require('selenium-server')
const phantomjs = require('phantomjs-prebuilt')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')

require('nightwatch-cucumber')({
  nightwatchOutput: false,
  cucumberArgs: [
    '--compiler', 'js:babel-core/register',
    '--require', 'e2e/util/hooks.js',
    '--require', 'e2e/step_definitions',
    '--format', 'node_modules/cucumber-pretty',
    'e2e'
  ]
})

const config = {
  output_folder: 'reports',
  custom_assertions_path: '',
  page_objects_path: 'e2e/page_objects',
  live_output: false,
  disable_colors: false,
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444
  },
  test_settings: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': chromedriver.path
        }
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      selenium: {
        cli_args: {
          'webdriver.gecko.driver': geckodriver.path
        }
      }
    }
  }
}

if (process.env.NODE_ENV === 'ci') {
  config.test_settings.default = {
    desiredCapabilities: {
      browserName: 'chrome',
      javascriptEnabled: true,
      acceptSslCerts: true,
      chromeOptions: {
        args: [
          'headless',
          'disable-web-security',
          'ignore-certificate-errors',
          'disable-gpu'
        ]
      }
    }
  }
} else {
  config.test_settings.default = {
    launch_url: 'http://localhost:8087',
    selenium_port: 4444,
    selenium_host: '127.0.0.1',
    desiredCapabilities: {
      browserName: 'phantomjs',
      javascriptEnabled: true,
      acceptSslCerts: true,
      'phantomjs.binary.path': phantomjs.path
    }
  }
}

module.exports = config
