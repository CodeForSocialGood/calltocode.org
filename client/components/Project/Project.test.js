/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {Project} from './Project'
let mockProps

beforeEach(() => {
  mockProps = {
    applyForProject: () => {},
    authenticated: null,
    project: {},
    user: {
      usertype: null
    }
  }
})

describe('<Project />', () => {
  describe('authenticated is truthy', () => {
    beforeEach(() => { mockProps.autheticated = true })
    describe('user has applied for project', () => {
      describe('user\'s usertype is "contact"', () => {

      })
      describe('user\'s usertype is "volunteer"', () => {
        describe('user\'s applied status could be true or false', () => {
          // render correct <span>
        })
      })
    })
    describe('user has not applied for project', () => {
      describe('user\'s usertype is "volunteer"', () => {
        // component for applyForProject renders
      })
      describe('user\'s usertype is "contact"', () => {

      })
    })
  })

  describe('authenticated is falsey', () => {
    beforeEach(() => { mockProps.autheticated = true })

  })
})
