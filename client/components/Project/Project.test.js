/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {Project} from './Project'
let mockProps

beforeEach(() => {
  mockProps = {
    applyForProject: () => {},
    authenticated: null,
    project: {
      name: '',
      organization: {name: ''},
      image: '',
      id: null
    },
    user: {
      usertype: null,
      projectsAppliedFor: []
    }
  }
})

describe('<Project />', () => {
  describe('authenticated is truthy', () => {
    beforeEach(() => { mockProps.autheticated = true })

    describe('user has applied for project', () => {
      beforeEach(() => {
        mockProps.project = {
          name: '',
          organization: {name: ''},
          image: '',
          id: 1
        }
        mockProps.user = {
          usertype: null,
          projectsAppliedFor: [1]
        }
      })

      describe('user\'s usertype is "contact"', () => {
        beforeEach(() => { mockProps.user.usertype = 'contact' })

      })

      describe('user\'s usertype is "volunteer"', () => {
        beforeEach(() => { mockProps.user.usertype = 'volunteer' })

      })
    })

    describe('user has not applied for project', () => {
      beforeEach(() => {
        mockProps.user = {
          usertype: null,
          projectsAppliedFor: []
        }
      })

      describe('user\'s usertype is "volunteer"', () => {
        beforeEach(() => { mockProps.user.usertype = 'volunteer' })
        // component for applyForProject renders
      })
      describe('user\'s usertype is "contact"', () => {
        beforeEach(() => { mockProps.user.usertype = 'contact' })
        
      })
    })
  })

  describe('authenticated is falsey', () => {
    beforeEach(() => { mockProps.autheticated = true })

  })
})
