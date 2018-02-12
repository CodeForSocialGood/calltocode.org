const { client } = require('nightwatch-cucumber')
const { Given, Then, When } = require('cucumber')

Given(/^I am logged out$/, async () => {
  const header = client.page.header()
  await header.waitForElementVisible('@loginButton', 2500)
  await header.waitForElementVisible('@signupButton', 2500)
})

Given(/^I am logged in$/, async () => {
  const header = client.page.header()
  await header.waitForElementNotPresent('@loginButton', 2500)
  await header.waitForElementNotPresent('@signupButton', 2500)
})

Given(/^I open the "(.*)" page$/, async selector => {
  const page = client.page[selector]()
  await page.navigate()
})

Then(/^I am on the "(.*)" page$/, async selector => {
  const page = client.page[selector]()
  await page.waitForElementVisible('@body', 2500)
  await client.assert.urlEquals(page.url)
})

When(/^I click the "(.*)" header link$/, async selector => {
  const header = client.page.header()
  await header.click(`@${selector}Button`)
})

When(/^I login with the login details (.*?) (.*?)$/, async (email, password) => {
  const login = client.page.login()
  login.setValue('@emailField', email)
  login.setValue('@passwordField', password)
  await login.submitForm('@loginForm')
})

When(/^I create a project with the project details (.*?)$/, async name => {
  const createProject = client.page.createProject()
  createProject.setValue('@nameField', name)
  await createProject.submitForm('@createProjectForm')
})

When(/^I apply to a project with the project details (.*?)$/, async name => {
  const home = client.page.home()
  await home.expect.element('@body').text.to.contain(name)
  await client.useXpath().click(`//div[text()="${name}"]`)
  await client.pause(250) // Need this pause for some reason
})

Then(/^I do not see the project with the project details (.*?)$/, async name => {
  const profile = client.page.profile()
  await profile.waitForElementPresent('@body', 2500)
  await profile.expect.element('@body').text.to.not.contain(name)
})

Then(/^I see the project with the project details (.*?)$/, async name => {
  const profile = client.page.profile()
  await profile.waitForElementPresent('@body', 2500)
  await profile.expect.element('@body').text.to.contain(name)
})
