import React from 'react'
import test from 'ava'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import {SignupForm} from './SignupForm'

test.beforeEach(t => {
  t.context.mockProps = {
    handleSubmit: () => {},
    isOrganization: null,
    signup: null
  }
})

test('is not organization', t => {
  t.context.mockProps.isOrganization = false
  const wrapper = shallow(<SignupForm {...t.context.mockProps} />)
	t.snapshot(toJson(wrapper))
})

test('is organization', t => {
  t.context.mockProps.isOrganization = true
  const wrapper = shallow(<SignupForm {...t.context.mockProps} />)
	t.snapshot(toJson(wrapper))
})
