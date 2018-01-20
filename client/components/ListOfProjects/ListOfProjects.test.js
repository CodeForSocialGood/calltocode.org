/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'

import {ListOfProjects} from './ListOfProjects'
let mockProps

beforeEach(() => {
  mockProps = {
    applyForProject: () => {},
    authenticated: false,
    projects: [],
    title: ''
  }
})

describe('<ListOfProjects />', () => {
  describe('list of projects is empty', () => {
    describe('autheticated is truthy', () => {
      
    })
    describe('authenticated is falsey', () => {

    })
  })
  describe('list of projects is not empty', () => {
    describe('autheticated is truthy', () => {

    })
    describe('authenticated is falsey', () => {

    })
  })
})
