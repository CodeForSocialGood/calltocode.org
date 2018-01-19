/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {ForgotPasswordForm} from './ForgotPasswordForm'
let mockProps
let mockState

beforeEach(() => {
  mockProps = {
    sendValidationCode: () => {},
    validateCode: () => {},
    email: null,
    handleSubmit: () => {},
    error: 'this is some error text',
    changePassword: () => {}
  }
  mockState = {
    page: null
  }
})

describe('<ForgotPasswordForm />', () => {
  describe('page === 1', () => {
    beforeEach(() => { mockState.page = 1 })

    test('component renders correctly', () => {
      const component = shallow(<ForgotPasswordForm {...mockProps} />)
      component.setState(mockState)
      expect(component.update()).toMatchSnapshot()
    })
  })

  describe('page === 2', () => {
    beforeEach(() => { mockState.page = 2 })

    test('component renders correctly', () => {
      const component = shallow(<ForgotPasswordForm {...mockProps} />)
      component.setState(mockState)
      expect(component.update()).toMatchSnapshot()
    })
  })

  describe('page === 3', () => {
    beforeEach(() => { mockState.page = 2 })

    test('component renders correctly', () => {
      const component = shallow(<ForgotPasswordForm {...mockProps} />)
      component.setState(mockState)
      expect(component.update()).toMatchSnapshot()
    })
  })
})
