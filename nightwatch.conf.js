const seleniumServer = require('selenium-server')
const phantomjs = require('phantomjs-prebuilt')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')

require('nightwatch-cucumber')({
  nightwatchOutput: false,
  cucumberArgs: [
    '--compiler', 'js:babel-core/register',
    '--require', 'client/test/e2e/hooks.js',
    '--require', 'client/test/e2e/step_definitions',
    '--format', 'node_modules/cucumber-pretty',
    'client/test/e2e'
  ]
})

module.exports = {
  output_folder: 'reports',
  custom_assertions_path: '',
  page_objects_path: 'client/test/e2e/page_objects',
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
    default: {
      launch_url: 'http://localhost:8087',
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'phantomjs.binary.path': phantomjs.path
      }
    },
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
