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
    start_process: false
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: [
            'window-size=1280,800',
            'disable-web-security'
          ]
        },
        selenium: {
          cli_args: {
            'webdriver.chrome.driver': 'node_modules/.bin/chromedriver'
          }
        }
      },
      ci: {
        launch_url: 'http://localhost',
        selenium_port: 4444,
        selenium_host: 'localhost',
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
    }
  }
}

module.exports = config
