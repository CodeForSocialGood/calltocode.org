/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {SendVerificationCodeForm} from './SendVerificationCodeForm'
let mockProps

beforeEach(() => {
  mockProps = {
    email: 'fakeEmail',
    onChangeEmail: () => {},
    handleSubmit: () => {}
  }
})

describe('<SendVerificationCodeForm />', () => {
  describe('email is length 0', () => {
    beforeEach(() => { mockProps.email = '' })

    test('component renders correctly', () => {
      const component = shallow(<SendVerificationCodeForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })

  describe('email is not length 0', () => {
    beforeEach(() => { mockProps.email = 'some@email.com' })

    test('component renders correctly', () => {
      const component = shallow(<SendVerificationCodeForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })
})
