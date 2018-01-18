/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import ValidateVerificationCodeForm from './ValidateVerificationCodeForm'
let mockProps

beforeEach(() => {
  mockProps = {
    code: null,
    onChangeCode: () => {},
    handleSubmit: () => {}
  }
})

describe('<ValidateVerificationCodeForm />', () => {
  describe('with props.code length 0', () => {
    beforeEach(() => { mockProps.code = [] })

    test('component renders correctly', () => {
      const component = shallow(<ValidateVerificationCodeForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })

  describe('with props.code length not 0', () => {
    beforeEach(() => { mockProps.code = ['some code'] })

    test('component renders correctly', () => {
      const component = shallow(<ValidateVerificationCodeForm {...mockProps} />)
      expect(component).toMatchSnapshot()
    })
  })
})
