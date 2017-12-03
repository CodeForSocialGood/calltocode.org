const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => {

  Given(/^I open the app$/, () => {
    return client
      .url('http://localhost:3000')
  })

  Then(/^the login nav button is visible$/, () => {
    client
      .expect.element('a[href="/login"]').to.be.visible
    client
      .expect.element('a[href="/login"]').text.to.equal('LOGIN')
  })

  When(/^I click on the login nav button$/, () => {
    return client
      .click('a[href="/login"]')
  })

  Then(/^I am routed to the login page$/, () => {
    return client
      .assert.urlContains('/login')
  })

  Given(/^I open the app login page$/, () => {
    return client
      .url('http://localhost:3000/login')
  })

  Then(/^the login form is visible$/, () => {
    return client
      .expect.element('form#loginForm').to.be.visible
  })

  Then(/^the login field is visible$/, () => {
    return client
      .expect.element('input[name="email"]').to.be.visible
  })

  Then(/^the password field is visible$/, () => {
    return client
      .expect.element('input[name="password"]').to.be.visible
  })

  When(/^I input the login details:$/, (table) => {
    const loginDetails = table.rowsHash()
    client.setValue('input[name="email"]', loginDetails.email)
    client.setValue('input[name="password"]', loginDetails.password)
    return
  })

  When(/^I submit the login form$/, () => {
    return client
      .submitForm('form#loginForm')
  })

  Then(/^I am routed to the home page$/, () => {
    return client
      .assert.urlEquals('http://localhost:3000/')
  })

  Then(/^the profile nav button is visible$/, () => {
    client
      .expect.element('a[href="/profile"]').to.be.visible
    client
      .expect.element('a[href="/profile"]').text.to.equal('PROFILE')
  })

  Then(/^the logout nav button is visible$/, () => {
    client
      .expect.element('a[href="/logout"]').to.be.visible
    client
      .expect.element('a[href="/logout"]').text.to.equal('LOGOUT')
  })

})
