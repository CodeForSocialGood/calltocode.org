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
      beforeEach(() => { mockProps.authenticated = true })

      test('component renders correctly', () => {
        const component = shallow(<ListOfProjects {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })
    describe('authenticated is falsey', () => {
      beforeEach(() => { mockProps.authenticated = false })

      test('component renders correctly', () => {
        const component = shallow(<ListOfProjects {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })
  })
  describe('list of projects is not empty', () => {
    beforeEach(() => { mockProps.projects = [{}] })

    describe('autheticated is truthy', () => {
      beforeEach(() => { mockProps.authenticated = true })

      test('component renders correctly', () => {
        const component = shallow(<ListOfProjects {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })
    describe('authenticated is falsey', () => {
      beforeEach(() => { mockProps.authenticated = false })

      test('component renders correctly', () => {
        const component = shallow(<ListOfProjects {...mockProps} />)
        expect(component).toMatchSnapshot()
      })
    })
  })
})
