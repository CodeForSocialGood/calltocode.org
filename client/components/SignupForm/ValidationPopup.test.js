import React from 'react'
import test from 'ava'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'

import ValidationPopup from './ValidationPopup'

test('not active, errors all null', t => {
  const wrapper = shallow(<ValidationPopup error={null} active={false}/>)
	t.snapshot(toJson(wrapper))
})

test('active, errors all null', t => {
  const wrapper = shallow(<ValidationPopup error={null} active={true}/>)
	t.snapshot(toJson(wrapper))
})

test('active, errors all engaged', t => {
  const errors = {
    upperCase: true,
    lowerCase: true,
    hasOneDigit: true,
    hasSpecialChar: true,
    minLength: true,
    maxLength: true,
    noIdenticalChars: true
  }

  const wrapper = shallow(<ValidationPopup error={errors} active={true}/>)
	t.snapshot(toJson(wrapper))
})

test('active, some errors engaged', t => {
  const errors = {
    upperCase: true,
    lowerCase: false,
    hasOneDigit: true,
    hasSpecialChar: false,
    minLength: true,
    maxLength: false,
    noIdenticalChars: true
  }

  const wrapper = shallow(<ValidationPopup error={errors} active={true}/>)
	t.snapshot(toJson(wrapper))
})
