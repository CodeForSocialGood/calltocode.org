/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {NewPasswordForm} from './NewPasswordForm'
let mockProps

beforeEach(() => {
  mockProps = {
    handleSubmit: () => {},
    changePassword: () => {},
    email: {}
  }
})

describe('<NewPasswordForm />', () => {
  describe('email exists in database', () => {
    
    describe('password of length 0', () => {

    })
    describe('password not of length 0', () => {

    })
  })
  describe('email does not exist in database', () => {
    describe('password of length 0', () => {

    })
    describe('password not of length 0', () => {

    })
  })
})
