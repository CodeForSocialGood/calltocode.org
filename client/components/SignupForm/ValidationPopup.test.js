import React from 'react'
import {shallow} from 'enzyme'

import ValidationPopup from './ValidationPopup'
let mockProps

beforeEach(() => {
  mockProps = {
    active: null,
    error: null
  }
})

describe('<ValidationPopup />', () => {
  describe('error is null', () => {
    beforeEach(() => { mockProps.error = null })

    describe('active is truthy', () => {
      beforeEach(() => { mockProps.active = true })
    }) 

    describe('active is falsey', () => {
      beforeEach(() => { mockProps.active = false })
    }) 
  })

  describe('error is an object', () => {
    beforeEach(() => { mockProps.error = {} })

    describe('all errors truthy', () => {
      beforeEach(() => {
        mockProps.error = {
          upperCase: true,
          lowerCase: true,
          hasOneDigit: true,
          hasSpecialChar: true,
          minLength: true,
          maxLength: true,
          noIdenticalChars: true
        }
      })

      describe('active is truthy', () => {
        beforeEach(() => { mockProps.active = true })
      }) 

      describe('active is falsey', () => {
        beforeEach(() => { mockProps.active = false })
      }) 
    })

    describe('all errors falsey', () => {
      beforeEach(() => {
        mockProps.error = {
          upperCase: false,
          lowerCase: false,
          hasOneDigit: false,
          hasSpecialChar: false,
          minLength: false,
          maxLength: false,
          noIdenticalChars: false
        }
      })

      describe('active is truthy', () => {
        beforeEach(() => { mockProps.active = true })
      }) 

      describe('active is falsey', () => {
        beforeEach(() => { mockProps.active = false })
      }) 
    })
  })
})
