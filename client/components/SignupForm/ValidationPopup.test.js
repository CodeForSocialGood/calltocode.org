import React from 'react'
import test from 'ava'
import render from 'react-test-renderer'

import ValidationPopup from './ValidationPopup'

test('not active, errors all null', t => {
  const popup = render.create(<ValidationPopup error={null} active={false}/>).toJSON()
	t.snapshot(popup)
})

test.only('active, errors all null', t => {
  const popup = render.create(<ValidationPopup error={null} active={true}/>).toJSON()
	t.snapshot(popup)
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

  const popup = render.create(<ValidationPopup error={errors} active={true}/>).toJSON()
	t.snapshot(popup)
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

  const popup = render.create(<ValidationPopup error={errors} active={true}/>).toJSON()
	t.snapshot(popup)
})
